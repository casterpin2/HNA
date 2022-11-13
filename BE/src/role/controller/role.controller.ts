import express, { Request, Response } from 'express';
import cors from 'cors';

import { Auth } from '../../jwt/auth';
import dotenv from 'dotenv';
import { PagingModel } from '../../constant/response.constant';

import { JwtPayload } from 'jsonwebtoken';
import { ResponseHandel } from '../../handel/handel';
import { RoleService } from '../service/role.service';

export class RoleController {
  RoleControllerRoutes(app: express.Application) {
    const service = new RoleService();
    const auth = new Auth();
    // app.post('/users/create', async (req, res: Response) => {
    //   const requestBody =req.body as UserModel;
    //   const response = await this.createUser(service, requestBody);
    //   ResponseHandel.modifyResponse(response, res);
    // });
    // app.put('/users', async (req, res: Response) => {
    //   const requestBody =req.body as UserModel;
    //   const response = await this.updateUser(service, requestBody);
    //   ResponseHandel.modifyResponse(response, res);
    // });
    // app.get('/users/detail/:id',auth.authMiddleware, async (req, res: Response) => {
    //   console.log(req.params.id);
    //   const response = await this.getUser(service, req.params.id as string);
    //   ResponseHandel.modifyResponse(response, res);
    // });
    // app.post('/users/login', async (req, res: Response) => {
    //   const response = await this.loginRoute(service, {
    //     username: req.body.username as string,
    //     password: req.body.password as string,
    //   } as UserModel);
    //   res.send(response);
    // });
    app.get('/role', auth.authMiddleware, async (req, res) => {
      const response = await this.getAll(service);
      ResponseHandel.modifyResponse(response, res);
    });
  }

//   loginRoute(service: UserService, user: UserModel) {
//     return service.login(user);
//   }
//   createUser(service: UserService, user: UserModel) {
//     return service.createUser(user);
//   }
//   getUser(service: UserService, id: string) {
//     return service.getUser(id);
//   }
  getAll(service: RoleService) {
    return service.getRole();
  }
//   updateUser(service:UserService,user:UserModel){
//     return service.updateUser(user);
//   }
}
