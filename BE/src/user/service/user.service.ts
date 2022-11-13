
import { UserModel } from '../entities/user.model';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { PagingModel, ResponseViewModel } from '../../constant/response.constant';
import { Auth } from '../../jwt/auth';

import {execute} from '../../database';
import { randomUUID } from 'crypto';
import { USERQUERIES } from '../../queries/users.queries';
export class UserService {
  

  public async login(user: UserModel): Promise<ResponseViewModel> {
    try {
      dotenv.config();
 
      const objectEmpty = this.validatorUser(user);
      if (objectEmpty) {
        return objectEmpty;
      }
      console.log(user);
    
      let data = await execute<UserModel>(USERQUERIES.GetUserByUsername, [user.username]);
      let result = Object.values(JSON.parse(JSON.stringify(data))) as UserModel[];
  
      if (!result.length) {
        return { data: null, status: 400, message: 'Username or Password not correct' };
      }
      const match = bcrypt.compareSync(user.password + `s04$$w0rD`, result[0].password);
      if (match) {
        const auth = new Auth();
        const accessToken = await auth.generateToken(
          { userId: result[0].id },
          process.env.ACCESS_TOKEN_SECRET as string,
          process.env.ACCESS_TOKEN_LIFE as string
        );

        return { data: accessToken, status: 200, message: 'successfully' };
      } else {
        return { data: null, status: 400, message: 'Username or Password not correct' };
      }
    } catch (ex) {
      throw new Error(`Could not login with user. Error: `+ex);
     
    }
  }
  public async createUser(user: UserModel): Promise<ResponseViewModel> {
    try {
      
   
      const objectEmpty = this.validatorUser(user);
      if (objectEmpty) {
        return objectEmpty;
      }
  
      const hash = bcrypt.hashSync(user.password + 's04$$w0rD', 10);
      let result = await execute(USERQUERIES.InsertUsers, [
        randomUUID(),
        user.username,
        user.role,
        user.phoneNumber,user.avatar,user.fullName,user.email,hash
      ]);
  
      return { data: result, status: 200, message: 'successfully' };
    } catch (err: any) {
      throw new Error(`Could not create user. Error: `+err);
    }
  }

  public validatorUser(user: UserModel) {
    
    if (!user.username) {
      return { data: {}, status: 400, message: 'Username is empty' };
    }
    if (!user.password) {
      return { data: {}, status: 400, message: 'Password is empty' };
    }
    return null;
  }
  public async getUser(id: string): Promise<ResponseViewModel> {
    try {
      dotenv.config();
      console.log(id)
      let data = await execute<UserModel>(USERQUERIES.GetUserByUserId, [id]);
      let dataConvert = Object.values(JSON.parse(JSON.stringify(data))) as UserModel[];
      return { data: dataConvert[0], status: 200, message: 'successfully' };
    } catch (ex: any) {
      throw new Error(`Could not get user. Error: `+ex);
    }
  }
  public async getAll(model: PagingModel): Promise<ResponseViewModel> {
    try {
     
      const page = (model.pageNo - 1) * model.pageSize;
      let searchName = model.searchName;
      
      const result = await execute<UserModel[]>(USERQUERIES.GetUsers, [page,model.pageSize]);
      console.log(searchName);
      let dataConvert = Object.values(JSON.parse(JSON.stringify(result))) as UserModel[];
      dataConvert = dataConvert.filter(x=>x.roleName != 'Admin');
      const response = {
        pageNo: model.pageNo,
        pageSize: model.pageSize,
        total: dataConvert.length,
        items: dataConvert,
      };
      return { data: response, status: 200, message: 'successfully' };
    } catch (ex: any) {
      throw new Error(`Could not get all user. Error: `+ex);
    }
  }
  public async  updateUser(user:UserModel) : Promise<ResponseViewModel>{
    try {
      let data = await execute<UserModel>(USERQUERIES.GetUserByUserId, [user.id]);
      let dataConvert = Object.values(JSON.parse(JSON.stringify(data))) as UserModel[];
      if(!dataConvert[0]){
        return { data: [], status: 400, message: 'Not found' };
      }
      
      await execute(USERQUERIES.UpdateUser, [
        user.role,
        user.phoneNumber,user.avatar,user.fullName,new Date(),user.email,user.id
      ]);
      let dataInsert = await execute<UserModel>(USERQUERIES.GetUserByUserId, [user.id]);
  
      return { data: dataInsert, status: 200, message: 'successfully' };
    } catch (err: any) {
      throw new Error(`Could not create user. Error: `+err);
    }
  }
  public async getUserByRole(role:number) : Promise<ResponseViewModel>{
    try {
     
    
      const result = await execute<UserModel[]>(USERQUERIES.GetUserByRole, [role]);
     
      return { data: result, status: 200, message: 'successfully' };
    } catch (ex: any) {
      throw new Error(`Could not get all user. Error: `+ex);
    }
  }
  public async  deleteUser(user:string) : Promise<ResponseViewModel>{
    try {
  
      await execute(USERQUERIES.DeleteUser, [
        0,
        user
      ]);
   
  
      return { status: 200, message: 'successfully' };
    } catch (err: any) {
      throw new Error(`Could not create user. Error: `+err);
    }
  }
}
