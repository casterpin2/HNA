
import { InjectRepository } from '@nestjs/typeorm';
import { PageRequest } from 'src/common/interface/page-request.interface';
import { DataSource, In, Repository } from 'typeorm';
import { ClassEntity } from './entity/class.entity';
import { ClassDto, CreateClassDto } from './dto/class.dto';
import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserDto } from 'src/user/dto/user.dto';
import { UserEntity } from 'src/user/entity/user.entity';
import { ClassFeeEntity } from './entity/class-fee.entity';
import { ClassFeeBulkDto, ClassFeeDto, CUClassFeeDto } from './dto/class-fee.dto';
import { ClassTimeEntity } from './entity/class-time.entity';
import { ClassTimeDto, CreateClassTimeBulkDto } from './dto/class-time.dto';
import { UserFeeEntity } from 'src/user/entity/user-fee.entity';


@Injectable()
export class ClassService {
    constructor(
        @InjectRepository(ClassEntity)
        private readonly repository: Repository<ClassEntity>,
        @InjectRepository(ClassFeeEntity)
        private readonly classFeeRepo: Repository<ClassFeeEntity>,
        @InjectRepository(ClassTimeEntity)
        private readonly classTimeRepo: Repository<ClassTimeEntity>,
        @InjectRepository(UserFeeEntity)
        private readonly userFeeRepo: Repository<UserFeeEntity>,
        private connection: DataSource
    ) { }
    public async getAll(options: PageRequest) {
        const { pageNo, pageSize } = options;
        return this.repository
            .createQueryBuilder('class')
            .where('isDeleted = 0')
            .skip((pageNo - 1) * pageSize)
            .take(pageSize)
            .getManyAndCount();
    }
    async create(
        newClass: CreateClassDto,
    ): Promise<ClassDto> {

        //2. Check username exists
        const classNameExists: boolean = await this.classNameExists(newClass.name);
        if (!!classNameExists) {
            throw new HttpException(
                'Class is already in use',
                HttpStatus.CONFLICT,
            );
        }

        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            
            //#region Add user and role
            const classEntity = this.repository.create(newClass);
            const classSave = await queryRunner.manager.save(classEntity);

            await queryRunner.commitTransaction();
            await queryRunner.release();

            //#endregion
            console.log(classEntity);
            return this.repository.findOne({ where: { id: classSave.id, isDeleted: false }, select: ['id', 'name','startDate','endDate','teacherId','isDeleted'] });
        } catch (error) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
           console.log(error);
        }
    }
    private async classNameExists(nameClass: string): Promise<boolean> {
        const user = await this.repository.findOne({ where: { name: nameClass, isDeleted: false } });

        return !!user;
    }
    async update(classId: string, classObject: CreateClassDto): Promise<ClassDto> {
        const existUser = await this.repository.findOne({
            where: { id: classId, isDeleted: false }
        });
        if (!existUser) {
            throw new HttpException('Class is not exists', HttpStatus.NOT_FOUND);
        }


        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            //#region Add user and role
            await this.repository.save({
                id: classId,
                ...classObject,
            });
            await queryRunner.commitTransaction();
            await queryRunner.release();
            //#endregion
            return this.repository.findOne({ where: { id: classId, isDeleted: false }, select: ['id', 'name','startDate','endDate','teacherId','isDeleted'] });
        } catch (error) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            console.log(error);
            throw new HttpException(
                'Email or username is already in use',
                HttpStatus.CONFLICT,
            );
        }
    }
    async delete(id: string) {
        const existUser = await this.repository.findOne({
            where: { id: id, isDeleted: false }
        });
        if (!existUser) {
            throw new HttpException('Class is not exists', HttpStatus.NOT_FOUND);
        }

        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {

            //#region Add user and role
            await this.repository.save({
                id: id,
                isDeleted:true
            });

            await queryRunner.commitTransaction();
            await queryRunner.release();
            //#endregion
            return true;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            
        }
    }
    public async findOneClass(id: string): Promise<ClassDto> {
        try {
            return this.repository.findOne({ where: { id: id, isDeleted: false }, select: ['id', 'name','startDate','endDate','teacherId','isDeleted'] });
        } catch (ex: any) {
            throw new Error(`Could not get user. Error: ` + ex);
        }
    }

    public async getClassFee(options: PageRequest,classId:string){
        const { pageNo, pageSize } = options;
        var data = this.classFeeRepo.createQueryBuilder('class_fee')
        .innerJoin("class","class","class.id = class_fee.classId")
        .where("class_fee.classId=:classId and class.isDeleted = 0 and class_fee.isDeleted=0",{classId:classId})
        .skip((pageNo - 1) * pageSize)
        .take(pageSize)
        .getManyAndCount();
        return data;
    }
    async createClassFee(
        newUser: ClassFeeBulkDto,
    ): Promise<Boolean> {

        //2. Check username exists
        console.log(newUser);
        newUser.fee.forEach(item=>{
            item.classId = newUser.classId;
        })

        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {

            //#region Add user and role
         
            const classFee = this.classFeeRepo.create(newUser.fee as any);
            const data = await queryRunner.manager.save(classFee);

            await queryRunner.commitTransaction();
            await queryRunner.release();
            if (data.length > 0) {
                return true;
            }
            //#endregion
        } catch (error) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            console.log(error);
            throw new HttpException('Role is not exists', HttpStatus.CONFLICT);

        }
    }
    async updateFee(classId: string, classObject: CUClassFeeDto): Promise<ClassFeeDto> {
     


        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            //#region Add user and role
            await this.classFeeRepo.save({
                id: classId,
                ...classObject,
            });
            await queryRunner.commitTransaction();
            await queryRunner.release();
            //#endregion
            return this.classFeeRepo.findOne({ where: { id: classId, isDeleted: false }, select: ['id', 'name','price','classId','isDeleted'] });
        } catch (error) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            console.log(error);
            throw new HttpException(
                'Email or username is already in use',
                HttpStatus.CONFLICT,
            );
        }
    }
    async deleteFee(classId: string): Promise<Boolean> {
     


        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            //#region Add user and role
            await this.classFeeRepo.save({
                id: classId,
                isDeleted:true
            });
            let userFee = await this.userFeeRepo.find({where:{feeId:classId}});
            console.log(userFee);
            if(userFee.length){
                userFee.forEach(item=>{
                    item.isDeleted = true;
                })
                await this.userFeeRepo.save(userFee);
            }
            await queryRunner.commitTransaction();
            await queryRunner.release();
            //#endregion
            return true
        } catch (error) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            console.log(error);
            throw new HttpException(
                'Email or username is already in use',
                HttpStatus.CONFLICT,
            );
        }
    }
    public async getAtendenceOfClass(options: PageRequest,classId:string){
        const { pageNo, pageSize } = options;
        var data =  this.classTimeRepo.createQueryBuilder('cl')
        .select(`cl.classId,cl.date,sum(cl.isPresent = 1) as 'yes',sum(cl.isPresent = 0) as 'no'`)
        .innerJoin("class","cla","cla.id = cl.classId")
        .leftJoin("user_class","u","u.userId = cl.userId")
        .where("cl.classId=:classId and cla.isDeleted = 0 and u.userId is not null",{classId:classId})
        .groupBy('cl.date')
        
        console.log(data.getCount())
        let dataPagging =await data.skip((pageNo - 1) * pageSize)
        .take(pageSize)
        .getRawMany();
        let count = await data.getRawMany();
        let result = Object.values(JSON.parse(JSON.stringify(dataPagging))) as any[];
        return {data:result, total:count.length};
    }
    public async getAtendenceOfClassStudent(classId:string){
   
        var data = await this.classTimeRepo.createQueryBuilder('clt')
        .select(`clt.id,clt.date,clt.userId,clt.isPresent,clt.classId`)
        .innerJoin("class","cl","cl.id = clt.classId")
        .where("clt.classId=:classId and cl.isDeleted = 0",{classId:classId})
        .getRawMany();
   
        let result = Object.values(JSON.parse(JSON.stringify(data))) as any[];
        return result;
    }
    async createClassTime(
        newUser: CreateClassTimeBulkDto,
    ): Promise<Boolean> {

        //2. Check username exists
     


        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {

            //#region Add user and role
         
            const classFee = this.classTimeRepo.create(newUser.attendence);
            const data = await queryRunner.manager.save(classFee);

            await queryRunner.commitTransaction();
            await queryRunner.release();
            if (data.length > 0) {
                return true;
            }
            //#endregion
        } catch (error) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            console.log(error);
            throw new HttpException('Role is not exists', HttpStatus.CONFLICT);

        }
    }
    async updateClassTime(classId: string, classObject: CreateClassTimeBulkDto): Promise<Boolean> {
     


        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            let userNotExist = classObject.attendence.filter(x => x.isAddNew);
            let userExist = classObject.attendence.filter(x => x.isUpdated);
            //#region Add user and role
            var arrayUpdate = await this.classTimeRepo.find({
                where:{
                    userId  : In(userExist.map(x=>x.userId)),
                classId : In(userExist.map(x=>x.classId))}
            })
            arrayUpdate.forEach(item=>{
                let objectFilter = userExist.find(x=>x.userId == item.userId && x.classId == classId);
                if(objectFilter){
                    item.isPresent = objectFilter.isPresent
                }
            })
            await this.classTimeRepo.save(arrayUpdate);
            console.log(userNotExist);
            if(userNotExist.length){
                let data =  this.classTimeRepo.create(userNotExist);
                await queryRunner.manager.save(data);
            }
            await queryRunner.commitTransaction();
            await queryRunner.release();
            //#endregion
            return true;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            console.log(error);
            throw new HttpException(
                'Email or username is already in use',
                HttpStatus.CONFLICT,
            );
        }
    }
    
    public async getUserFeeOfClassByRole(userId:string) {
        var data = await this.classFeeRepo.createQueryBuilder('cf')
            .leftJoin('user_fee', 'us', "FIND_IN_SET(cf.id,us.feeId)")
            .innerJoin("class",'c',"c.id = cf.classId")
            .where('us.userId =:userId and c.isDeleted = 0 and cf.isDeleted = 0',{userId:userId})
            .select("cf.id,cf.name,cf.price,us.userId,us.updatedDate")
            .getRawMany();
        let result = Object.values(JSON.parse(JSON.stringify(data))) as any[];
        return result;
    }
    public async getAttendenceOfUser(options: PageRequest,userId:string,classId:string) {
        const { pageNo, pageSize } = options;
        var query =  this.classTimeRepo.createQueryBuilder('clt')
            .innerJoin("class",'cl'," cl.id  =  clt.classId")
            .where('clt.userId =:userId and clt.classId =:classId and cl.isDeleted = 0',{userId:userId,classId:classId})
            .select("clt.date as 'date',clt.isPresent as 'isPresent' ")
            var data = await query.skip((pageNo - 1) * pageSize)
            .take(pageSize).getRawMany()
            var count = await query.getRawMany();
        let result = Object.values(JSON.parse(JSON.stringify(data))) as any[];
        return {data:result, total:count.length};
    }
    
    public async getClassByRole(options: PageRequest,userId:string) {
        const { pageNo, pageSize } = options;
        var data = await this.repository.createQueryBuilder('c')
            .innerJoin("user_class",'us',"us.classId = c.id")
            .where('c.isDeleted = 0  and us.userId =:userId',{userId:userId})
            .orderBy('c.name')
            .skip((pageNo - 1) * pageSize)
            .take(pageSize)
            .getManyAndCount();
        return data;
    }

    public async getClassFeeOfUser(options: PageRequest,userId:string) {
        const { pageNo, pageSize } = options;
        console.log(1);
        var data = await this.classFeeRepo.createQueryBuilder('cf')
            .leftJoin("user_fee",'us'," FIND_IN_SET(cf.id,us.feeId)")
            .innerJoin("class",'c',"c.id = cf.classId")
            .where('us.userId =:userId and c.isDeleted = 0 and cf.isDeleted = 0 ',{userId:userId})
            .skip((pageNo - 1) * pageSize)
            .take(pageSize)
            .getManyAndCount();
       
        return data;
    }
    
    
}   
