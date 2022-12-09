import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from './role/role.module';
import { ClassModule } from './class/class.module';
import { ContentModule } from './content/content.module';
import { ArticleModule } from './article/article.module';
import {MulterModule} from '@nestjs/platform-express'
import { SettingModule } from './setting/setting.module';
import { ClientModule } from './client/client.module';
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '12345678',
    database: 'edu',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false,
  }),
  ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    RoleModule,
    ClassModule,
    ContentModule,
    ArticleModule,
    SettingModule,
    ClientModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }],
})
export class AppModule { }
