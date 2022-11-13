

import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { PagingModel, ResponseViewModel } from '../../constant/response.constant';
import { Auth } from '../../jwt/auth';

import {execute} from '../../database';
import { randomUUID } from 'crypto';
import { USERQUERIES } from '../../queries/users.queries';
import { ROLE_QUERIES } from '../../queries/role.queries';
export class RoleService {
  

  public async getRole(): Promise<ResponseViewModel> {
    try {
      
   
     
    
      let result = await execute(ROLE_QUERIES.GetRoles, []);
  
      return { data: result, status: 200, message: 'successfully' };
    } catch (err: any) {
      throw new Error(`Could not create user. Error: `+err);
    }
  }

//   public validatorUser(user: UserModel) {
    
//     if (!user.username) {
//       return { data: {}, status: 400, message: 'Username is empty' };
//     }
//     if (!user.password) {
//       return { data: {}, status: 400, message: 'Password is empty' };
//     }
//     return null;
//   }
//   public async getUser(id: string): Promise<ResponseViewModel> {
//     try {
//       dotenv.config();
//       console.log(id)
//       let data = await execute<UserModel>(USERQUERIES.GetUserByUserId, [id]);
//       let dataConvert = Object.values(JSON.parse(JSON.stringify(data))) as UserModel[];
//       return { data: dataConvert[0], status: 200, message: 'successfully' };
//     } catch (ex: any) {
//       throw new Error(`Could not get user. Error: `+ex);
//     }
//   }
//   public async getAll(model: PagingModel): Promise<ResponseViewModel> {
//     try {
     
//       const page = (model.pageNo - 1) * model.pageSize;
//       console.log(page);
      
//       const result = await execute<UserModel[]>(USERQUERIES.GetUsers, [page,model.pageSize]);
//       let dataConvert = Object.values(JSON.parse(JSON.stringify(result))) as UserModel[];
//       dataConvert = dataConvert.filter(x=>x.roleName != 'Admin');
//       const response = {
//         pageNo: model.pageNo,
//         pageSize: model.pageSize,
//         total: dataConvert.length,
//         items: dataConvert,
//       };
//       return { data: response, status: 200, message: 'successfully' };
//     } catch (ex: any) {
//       throw new Error(`Could not get all user. Error: `+ex);
//     }
//   }
//   public async  updateUser(user:UserModel) : Promise<ResponseViewModel>{
//     try {
//       let data = await execute<UserModel>(USERQUERIES.GetUserByUserId, [user.id]);
//       let dataConvert = Object.values(JSON.parse(JSON.stringify(data))) as UserModel[];
//       if(!dataConvert[0]){
//         return { data: [], status: 400, message: 'Not found' };
//       }
      
//       await execute(USERQUERIES.UpdateUser, [
//         user.role,
//         user.phoneNumber,user.avatar,user.fullName,new Date(),user.email,user.id
//       ]);
//       let dataInsert = await execute<UserModel>(USERQUERIES.GetUserByUserId, [user.id]);
  
//       return { data: dataInsert, status: 200, message: 'successfully' };
//     } catch (err: any) {
//       throw new Error(`Could not create user. Error: `+err);
//     }
//   }
}
