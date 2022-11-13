import express, { Request, Response } from 'express';

import { Auth } from '../../jwt/auth';
import dotenv from 'dotenv';
import { PagingModel } from '../../constant/response.constant';
import { JwtPayload } from 'jsonwebtoken';
import { ResponseHandel } from '../../handel/handel';
import { ClassService } from '../service/class.service';
import { ClassInsertModel, ClassModel } from '../entities/class.model';

export class ClassController {
    ClassControllerRoutes(app: express.Application) {
        const service = new ClassService();
        const auth = new Auth();
        app.post('/class/create', auth.authMiddleware, async (req, res: Response) => {
            const requestBody = req.body as ClassInsertModel;
            const response = await this.createClass(service, requestBody, req.params.userId);
            ResponseHandel.modifyResponse(response, res);
        });
        app.put('/class/update', auth.authMiddleware, async (req, res: Response) => {
            const requestBody = req.body as ClassModel;
            const response = await this.updateClass(service, requestBody, req.params.userId);
            ResponseHandel.modifyResponse(response, res);
        });
        app.get('/class/:id', auth.authMiddleware, async (req, res: Response) => {
            const response = await this.getClassById(service, req.params.id as string);
            ResponseHandel.modifyResponse(response, res);
        });

        app.post('/class/show', auth.authMiddleware, async (req, res) => {
            const requestBody = {
                pageNo: req.body.pageNo as number,
                pageSize: req.body.pageSize as number,
                searchName: '',
            } as PagingModel;
            const response = await this.getAllClass(service, requestBody);

            ResponseHandel.modifyResponse(response, res);
        });
        app.get('/class/student/:id', auth.authMiddleware, async (req, res: Response) => {
            const response = await service.getStudentOfClass(req.params.id as string);
            ResponseHandel.modifyResponse(response, res);
        });
        app.get('/class/studentOther/:id', auth.authMiddleware, async (req, res: Response) => {
            console.log(req.query.pageNo);
            const requestBody = {
                pageNo: Number(req.query.pageNo),
                pageSize: Number(req.query.pageSize),
                searchName: '',
            } as PagingModel;
            const response = await service.getDiffrentUser(requestBody);
            ResponseHandel.modifyResponse(response, res);
        });

        app.post('/clas/addUser/:id', auth.authMiddleware, async (req, res: Response) => {
            const response = await service.addUserToClass(req.params.id as string, req.body.userId);
            ResponseHandel.modifyResponse(response, res);
        });
        app.post('/class/removeUser/:id', auth.authMiddleware, async (req, res: Response) => {
            const response = await service.removeUser(req.params.id as string, req.body.userId);
            ResponseHandel.modifyResponse(response, res);
        });
    }


    createClass(service: ClassService, classModel: ClassInsertModel, userId: string) {
        return service.createClass(classModel, userId);
    }
    updateClass(service: ClassService, classModel: ClassModel, userId: string) {
        return service.updateClass(classModel, userId);
    }
    getClassById(service: ClassService, id: string) {
        return service.getClassById(id);
    }
    getAllClass(service: ClassService, model: PagingModel) {
        return service.getAll(model);
    }
}
