import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AppService } from './app.service';
import { bucket } from './common/firebase';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return  new Promise((resolve, reject)=>{
      const uuid = randomUUID();
      const blob = bucket.file(uuid)
      const blobWriter = blob.createWriteStream({
        metadata: {
          contentType: file.mimetype,
          metadata: {
            firebaseStorageDownloadTokens: uuid
          }
  
        }
      })
  
      blobWriter.on('error', (err) => {
        console.log(err)
        reject(err);
      })
  
       blobWriter.on('finish', (callback) => {
        let data = {
          url: "https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + uuid + "?alt=media&token=" + uuid
        }
  
        resolve(data.url);
      })
  
      blobWriter.end(file.buffer)
    })
    

    
   
  }
}
