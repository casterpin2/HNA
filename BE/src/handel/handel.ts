import { Response } from 'express';
import { ResponseViewModel } from '../constant/response.constant';

export class ResponseHandel {
  public static modifyResponse(response: ResponseViewModel, res: Response) {
    switch (response.status) {
      case 200:
        res.status(200).send(response);
        break;
      default:
        res.status(response.status).send(response.message);
        break;
        
    }
  }
}
