import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/service/auth.service';
import { PageRequest } from 'src/common/interface/page-request.interface';

import { UpdateResult, DeleteResult, DataSource, Repository, In } from 'typeorm';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { UserDto } from './dto/user.dto';
import { CreateClassDto, CreateUserDto, UpdateUserDto } from './user.controller';
import { UserEntity } from './entity/user.entity';
import { UserClassEntity } from './entity/user-class.entity';
import { UserFeeEntity } from './entity/user-fee.entity';
import { CreateUserFeeDto } from './dto/user-fee.dto';
import { use } from 'passport';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,
        @InjectRepository(UserClassEntity)
        private readonly userClassRepo: Repository<UserClassEntity>,
        @InjectRepository(UserFeeEntity)
        private readonly userFeeRepo: Repository<UserFeeEntity>,
        private authService: AuthService,
        private connection: DataSource
    ) { }
    async login(user: LoginRequestDto): Promise<LoginResponseDto> {
        const foundUser: UserDto = await this.findByUsernameWithPassword(
            user.username.toLowerCase().trim(),
        );
        console.log(foundUser);
        if (foundUser) {

            const matches: boolean = await this.validatePassword(
                user.password,
                foundUser.password,
            );
            if (matches) {
                foundUser.password = undefined;
                const jwt = await this.authService.generateJwt(foundUser);
                const userLoginDto = new LoginResponseDto();
                userLoginDto.accessToken = jwt;
                userLoginDto.userId = foundUser.id;
                userLoginDto.role = foundUser.role;
                return userLoginDto;
            } else {
                throw new UnauthorizedException(
                    'Login was not successfull, wrong credentials',
                );
            }
        } else {
            throw new UnauthorizedException(
                'Login was not successfull, wrong credentials',
            );
        }
    }
    private async findByUsernameWithPassword(username: string): Promise<UserDto> {
        return this.userRepo.findOne({
            where: { username: username, isDeleted: false }
        });
    }

    private async validatePassword(
        password: string,
        storedPasswordHash: string,
    ): Promise<any> {
        return this.authService.comparePasswords(password, storedPasswordHash);
    }
    private async usernameExists(username: string): Promise<boolean> {
        const user = await this.userRepo.findOne({ where: { username: username, isDeleted: false } });

        return !!user;
    }
    private async hashPassword(password: string): Promise<string> {
        return this.authService.hashPassword(password);
    }

    async create(
        newUser: CreateUserDto,
    ): Promise<UserDto> {

        //2. Check username exists
        const usernameExists: boolean = await this.usernameExists(newUser.username);
        if (!!usernameExists) {
            throw new HttpException(
                'Username is already in use',
                HttpStatus.CONFLICT,
            );
        }

        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const passwordHash: string = await this.hashPassword(newUser.password);
            newUser.password = passwordHash;

            //#region Add user and role
            const userEntity = this.userRepo.create(newUser);
            const user = await queryRunner.manager.save(userEntity);

            await queryRunner.commitTransaction();
            await queryRunner.release();

            //#endregion

            return this.userRepo.findOne({ where: { id: user.id, isDeleted: false }, select: ['id', 'fullName', 'username', 'avatar'] });
        } catch (error) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            console.log(error);
            throw new HttpException('Role is not exists', HttpStatus.CONFLICT);
        }
    }
    public async getUser(id: string): Promise<UserDto> {
        try {
            return this.userRepo.findOne({ where: { id: id }, select: ['id', 'fullName', 'username', 'avatar', 'phoneNumber'] });
        } catch (ex: any) {
            throw new Error(`Could not get user. Error: ` + ex);
        }
    }
    public async getAll(options: PageRequest, userId: string) {
        const { pageNo, pageSize } = options;
        let user = await this.userRepo.findOne({ where: { id: userId } });
        let roleShow = "isDeleted = 0";
        if (user) {
            switch (user.role) {
                case 1:
                    roleShow = "isDeleted = 0 and role in(1,2,3)";
                    break;
                case 3:
                    roleShow = "isDeleted = 0 and role = 2";
                    break;
            }

        }
        let [data, total] = await this.userRepo
            .createQueryBuilder('user')
            .where(roleShow)
            .skip((pageNo - 1) * pageSize)
            .take(pageSize)
            .orderBy('fullName')
            .getManyAndCount();
        data.forEach(item => {
            delete item['password'];
        })
        return {data, total};
    }
    async update(userId: string, user: UpdateUserDto): Promise<UserDto> {
        const existUser = await this.userRepo.findOne({
            where: { id: userId, isDeleted: false }
        });
        if (!existUser) {
            throw new HttpException('User is not exists', HttpStatus.NOT_FOUND);
        }


        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            //Do not allow to update password
            delete user['username'];
            delete user['password'];

            //#region Add user and role
            await this.userRepo.save({
                id: userId,
                ...user,
            });





            await queryRunner.commitTransaction();
            await queryRunner.release();
            //#endregion

            return this.userRepo.findOne({ where: { id: userId, isDeleted: false }, select: ['id', 'fullName', 'username', 'avatar'] });
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
    async delete(userId: string) {
        const existUser = await this.userRepo.findOne({
            where: { id: userId, isDeleted: false }
        });
        if (!existUser) {
            throw new HttpException('User is not exists', HttpStatus.NOT_FOUND);
        }

        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {

            //#region Add user and role
            await this.userRepo.save({
                id: userId,
                isDeleted: true
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
    async getUserByRole(): Promise<UserDto[]> {
        return await this.userRepo.find({ where: { role: 3, isDeleted: false }, select: ['id', 'fullName', 'username'] });
    }
    public async getUserOtherOfClass(options: PageRequest) {
        const { pageNo, pageSize } = options;
        var query = this.userRepo.createQueryBuilder('user')
            .leftJoin('user_class', 'user_class', "user_class.userId = user.id")
            .where('user_class.classId is NULL and user.role = 2  and user.isDeleted = 0')
            .select("user.id,user.fullName,user.username,user.avatar,user.phoneNumber,user_class.classId")
        var data = await query.skip((pageNo - 1) * pageSize)
        .take(pageSize)
        .getRawMany();
        var dataCount = await query
        .getRawMany();
        let result = Object.values(JSON.parse(JSON.stringify(data))) as any[];
        return {data:result,total:dataCount.length};
    }

    async createUserClass(
        newUser: CreateClassDto,
    ): Promise<Boolean> {

        //2. Check username exists
        let userClass = [] as any;
        newUser.userId.forEach(item => {
            userClass.push({ userId: item, classId: newUser.classId })
        })

        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {

            //#region Add user and role
            console.log(userClass);
            const userEntity = this.userClassRepo.create(userClass);
            const user = await queryRunner.manager.save(userEntity);

            await queryRunner.commitTransaction();
            await queryRunner.release();
            if (user.length > 0) {
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
    public async getUserOfClass(options: PageRequest, id: string) {
        const { pageNo, pageSize } = options;
        var query = this.userClassRepo.createQueryBuilder('user_class')
            .innerJoin('user', 'user', "user_class.userId = user.id")
            .where('user_class.classId =:classId and user.isDeleted = 0', { classId: id })
            .select("user.id,user.fullName,user.username,user.avatar,user.phoneNumber");
        var data = await query.skip((pageNo - 1) * pageSize)
        .take(pageSize)
        .getRawMany();
        var dataCount= await query.getRawMany();
        let result = Object.values(JSON.parse(JSON.stringify(data))) as any[];
        return {data:result,total:dataCount.length};
    }
    public async getUserFeeOfClass(userId: string) {
        var data = await this.userFeeRepo.createQueryBuilder('uf')
            .leftJoin('class_fee', 'c', "FIND_IN_SET(c.id,uf.feeId)")
            .where('uf.userId =:userId and uf.isChecked = 1 and uf.isDeleted = 0 and c.isDeleted = 0', { userId: userId })
            .select("uf.feeId as id")
            .getRawMany();
        let result = Object.values(JSON.parse(JSON.stringify(data))) as any[];
        return result.map(x => x.id);
    }
    async createUserFee(
        fee: string[], userId: string
    ): Promise<Boolean> {
        console.log(fee);
        //2. Check username exists
        let fees = [] as any;

        const existUser = await this.userFeeRepo.find({
            where: { userId: userId, isDeleted: false }
        });
        if (existUser.length > 0) {
            existUser.forEach(item => {
                if (fee.includes(item.feeId)) {
                    item.isChecked = true;
                } else {
                    item.isChecked = false;
                }
            })
        } else {
            fee.forEach(item => {
                fees.push({ userId: userId, feeId: item, isChecked: true })
            })
        }

        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {

            //#region Add user and role
            if (fees.length > 0) {
                const userFeeEntity = this.userFeeRepo.create(fees);
                const user = await queryRunner.manager.save(userFeeEntity);
            } else {
                await this.userFeeRepo.save(existUser);
            }

            await queryRunner.commitTransaction();
            await queryRunner.release();
            return true
            //#endregion
        } catch (error) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            console.log(error);
            throw new HttpException('Role is not exists', HttpStatus.CONFLICT);

        }
    }
    async updateUserFee(id: string, fee: string[]) {
        const existUser = await this.userFeeRepo.find({
            where: { userId: id, isDeleted: false }
        });
        if (!existUser) {
            throw new HttpException('User Fee is not exists', HttpStatus.NOT_FOUND);
        }
        let feeIds = existUser.map(x => x.feeId);

        let arrayCreateFee = fee.filter(item => !feeIds.includes(item));

        let createNewUserFee = [] as any;
        arrayCreateFee.forEach(item => {
            createNewUserFee.push({ userId: id, feeId: item, isChecked: true })
        })
        existUser.forEach(item => {
            if (fee.includes(item.feeId)) {
                item.isChecked = true;
            } else {
                item.isChecked = false;
            }
        })
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            //#region Add user and role
            await this.userFeeRepo.save(existUser);
            if (createNewUserFee.length > 0) {
                const userFeeEntity = this.userFeeRepo.create(createNewUserFee);
                await queryRunner.manager.save(userFeeEntity);
            }
            await queryRunner.commitTransaction();
            await queryRunner.release();
            //#endregion
            return true;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();

        }
    }
    public async deleteUserClass(userId: string[], classId: string) {
        const existUser = await this.userClassRepo.find({
            where: { userId: In(userId), classId: classId }
        });
        if (!existUser) {
            throw new HttpException('user is not exists', HttpStatus.NOT_FOUND);
        }

        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {

            //#region Add user and role
            await this.userClassRepo.createQueryBuilder().delete().where('userId in (:...userId) and classId=:classId', { userId: userId, classId: classId }).execute();

            await queryRunner.commitTransaction();
            await queryRunner.release();
            //#endregion
            return true;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();

        }
    }
    
}   
