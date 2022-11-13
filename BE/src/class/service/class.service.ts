

import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { PagingModel, ResponseViewModel } from '../../constant/response.constant';
import { Auth } from '../../jwt/auth';
import { USERQUERIES } from "../../queries/users.queries";
import { execute } from '../../database';
import { randomUUID } from 'crypto';
import { UserModel } from '../../user/entities/user.model';
import { ClassInsertModel, ClassModel } from '../entities/class.model';
import { MESSAGE } from '../../constant/message.contant';
import { ClassQueries } from '../../queries/classes.queries';
export class ClassService {

    public async createClass(classModel: ClassInsertModel, userId: string): Promise<ResponseViewModel> {
        try {

            if (!classModel.name) {
                return { data: "Tên lớp" + MESSAGE.EMPTY, status: 400, message: 'successfully' };
            }
           
            let resultDuplicate = await execute(ClassQueries.GetNameClass,[classModel.name.trim().toLowerCase()]);
            let objectDuplicate = Object.values(JSON.parse(JSON.stringify(resultDuplicate))) as ClassModel[];
         
            if(objectDuplicate.length > 0){
             
                return { data: [], status: 409, message: 'Tên lớp đã tồn tại' };
            }
         
            const classId = randomUUID();
            let result = await execute(ClassQueries.InsertClass, [
                classId,
                classModel.name,
                classModel.startDate,
                classModel.endDate, userId, classModel.description, classModel.teacherId
            ]) as any;
          
            return { data: result.affectedRows, status: 200, message: 'successfully' };
        } catch (err: any) {
            console.log(err);
            return { data: err, status: 500, message: 'createClass'+err };
        }
    }

    public async updateClass(classModel: ClassModel, userId: string): Promise<ResponseViewModel> {
        try {

            if (!classModel.name) {
                return { data: "Tên lớp" + MESSAGE.EMPTY, status: 400, message: "Tên lớp" + MESSAGE.EMPTY };
            }
            let resultDuplicate = await execute(ClassQueries.GetNameUpdateClass,[classModel.name.trim().toLowerCase(),classModel.id]);
            let objectDuplicate = Object.values(JSON.parse(JSON.stringify(resultDuplicate))) as ClassModel[];
            if(objectDuplicate.length > 0){
                return { data: "Tên lớp" + MESSAGE.EMPTY, status: 409, message: 'Tên lớp đã tồn tại' };
            }
            let data = await execute<ClassModel>(ClassQueries.GetOneClass, [classModel.id]);

            let object = Object.values(JSON.parse(JSON.stringify(data))) as ClassModel[];
            let classEntities = object[0];
            if (!classEntities) {
                return { data: `Lớp + ${MESSAGE.NOT_FOUND}`, status: 404, message: `Lớp + ${MESSAGE.NOT_FOUND}` };
            }
            let result = await execute<{ affectedRows: number }>(ClassQueries.UpdateClass, [
                classModel.name, classModel.startDate, classModel.endDate, userId, new Date(), classModel.teacherId, classModel.id
            ])
            return { data: result, status: 200, message: 'successfully' };
        } catch (err: any) {
            return { data: [], status: 500, message: 'updateClass'+err };
        }
    }
    public async getClassById(id: string): Promise<ResponseViewModel> {
        try {
            dotenv.config();
            let data = await execute<ClassModel>(ClassQueries.GetOneClass, [id]);
            return { data: data, status: 200, message: 'successfully' };
        } catch (ex: any) {
            return { data: [], status: 500, message: 'getClassById' };
        }
    }
    public async getAll(model: PagingModel): Promise<ResponseViewModel> {
        try {

            const page = (model.pageNo - 1) * model.pageSize;

            const result = await execute<ClassModel[]>(ClassQueries.GetAllClass, [page, model.pageSize]);
            let dataConvert = Object.values(JSON.parse(JSON.stringify(result))) as ClassModel[];
           
            const response = {
                pageNo: model.pageNo,
                pageSize: model.pageSize,
                total: dataConvert.length,
                items: dataConvert,
            };
            return { data: response, status: 200, message: 'successfully' };
        } catch (ex: any) {
         return { data: [], status: 500, message: 'getAll' };
        }
    }
    public async getStudentOfClass(id:string): Promise<ResponseViewModel> {
        try {
            let userData = await execute<UserModel[]>(ClassQueries.GetUserByClass, [id]);
            
            return { data: userData, status: 200, message: 'successfully' };
        } catch (ex: any) {
         return { data: [], status: 500, message: 'getStudentOfClass' };
        }
    }
    public async getDiffrentUser(model: PagingModel) : Promise<ResponseViewModel> {
        try {
            const page = (model.pageNo - 1) * model.pageSize;

            let reusult = await execute<UserModel[]>(ClassQueries.GetDifferentUser, [page,model.pageSize]);
            let dataConvert = Object.values(JSON.parse(JSON.stringify(reusult))) as UserModel[];
            const response = {
                pageNo: model.pageNo,
                pageSize: model.pageSize,
                total: dataConvert.length,
                items: dataConvert,
            };
            return { data: response, status: 200, message: 'successfully' };
        } catch (ex: any) {
            return { data: [], status: 500, message: 'getDiffrentUser' };
        }
    }
    public async addUserToClass(id:string,userId:string[]) : Promise<ResponseViewModel>{
        
        try {
            var values = [
            ] as any;
            userId.forEach(item=>{
                values.push([item,id]);
            })
            let userClass = await execute(ClassQueries.InsertUserClass, [values]) as any;
            return { data: userClass.affectedRows, status: 200, message: 'successfully' };
        } catch (ex: any) {
            return { data: [], status: 500, message: 'addUserToClass' };
        }
    }
    public async removeUser(id:string,userId:string[]) : Promise<ResponseViewModel>{
        
        try {
            var values = [
            ] as any;
            userId.forEach(item=>{
                values.push([item,id]);
            })
            let userClass = await execute(ClassQueries.RemoveUserClass, [values]) as any;
            return { data: userClass.affectedRows, status: 200, message: 'successfully' };
        } catch (ex: any) {
            return { data: [], status: 500, message: 'removeUser' };
        }
    }
}
