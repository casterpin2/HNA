import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { UserController } from './user/controller/user.controller';
import * as MySQLConnector from './database';
import dotenv from 'dotenv';
import { ClassController } from './class/controller/class.controller';
import cors from 'cors';
import multer from 'multer';
import {bucket} from './firebase';
import { randomUUID } from 'crypto';
import { RoleController } from './role/controller/role.controller';
const app = express();
const port = 3000;
//app.enable
// Add routes
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,'X-Access-Token', 'Authorization'");
  next();
});

dotenv.config({ path: `.env.${process.env.NODE_ENV || ''} ` });
const upload = multer({
  storage: multer.memoryStorage()
})

app.post('/upload', upload.single('file'), (req, res) => {
  if(!req.file) {
      return res.status(400).send("Error: No files found")
  } 
  const uuid = randomUUID();
  const blob = bucket.file(uuid)
  
  const blobWriter = blob.createWriteStream({
      metadata: {
          contentType: req.file.mimetype,
          metadata: {
            firebaseStorageDownloadTokens: uuid
          }

      }
  })
  
  blobWriter.on('error', (err) => {
      console.log(err)
  })

  blobWriter.on('finish', () => {
    let data = {
      url : "https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + uuid + "?alt=media&token=" + uuid
    }
      res.status(200).send(data);
  })
  
  blobWriter.end(req.file.buffer)
})
const userController = new UserController();
userController.UserControllerRoutes(app);
const classController = new ClassController();
classController.ClassControllerRoutes(app);
const role = new RoleController();
role.RoleControllerRoutes(app);
// Start server
app.listen(port, (): void => {
  console.log(`Projcet run with port ${port}`);
});

export default app;
