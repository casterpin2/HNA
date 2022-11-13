import express, { Request, Response } from 'express';
import cors from 'cors';
import { UserService } from '../service/user.service';
import { Auth } from '../../jwt/auth';
import dotenv from 'dotenv';
import { PagingModel } from '../../constant/response.constant';
import { UserModel } from '../entities/user.model';
import { JwtPayload } from 'jsonwebtoken';
import { ResponseHandel } from '../../handel/handel';

export class UserController {
  UserControllerRoutes(app: express.Application) {
    const service = new UserService();
    const auth = new Auth();
    app.post('/users/create', async (req, res: Response) => {
      const requestBody =req.body as UserModel;
      const response = await this.createUser(service, requestBody);
      ResponseHandel.modifyResponse(response, res);
    });
    app.put('/users', async (req, res: Response) => {
      const requestBody =req.body as UserModel;
      const response = await this.updateUser(service, requestBody);
      ResponseHandel.modifyResponse(response, res);
    });
    app.get('/users/detail/:id',auth.authMiddleware, async (req, res: Response) => {

      const response = await this.getUser(service, req.params.id as string);
      ResponseHandel.modifyResponse(response, res);
    });
    app.post('/users/login', async (req, res: Response) => {
      const response = await this.loginRoute(service, {
        username: req.body.username as string,
        password: req.body.password as string,
      } as UserModel);
      res.send(response);
    });
    app.post('/users/show', auth.authMiddleware, async (req, res) => {
      
      const requestBody = {
        pageNo: req.body.pageNo as number,
        pageSize: req.body.pageSize as number,
        searchName: '',
      } as PagingModel;
      const response = await this.getAll(service, requestBody);

      ResponseHandel.modifyResponse(response, res);
    });
    app.get('/users/getByRole', auth.authMiddleware, async (req, res) => {
      
      
      const response = await this.getUserByRole(service, Number(req.query.role));

      ResponseHandel.modifyResponse(response, res);
    });
    app.delete('/users/:id', auth.authMiddleware, async (req, res) => {
      
      
      const response = await service.deleteUser(req.params.id);

      ResponseHandel.modifyResponse(response, res);
    });
  }

  loginRoute(service: UserService, user: UserModel) {
    return service.login(user);
  }
  createUser(service: UserService, user: UserModel) {
    return service.createUser(user);
  }
  getUser(service: UserService, id: string) {
    return service.getUser(id);
  }
  getAll(service: UserService, model: PagingModel) {
    return service.getAll(model);
  }
  updateUser(service:UserService,user:UserModel){
    return service.updateUser(user);
  }
  getUserByRole(service : UserService,role:number){
    return service.getUserByRole(role);
  }
}
