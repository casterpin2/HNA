import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserClassEntity } from './entity/user-class.entity';
import { UserFeeEntity } from './entity/user-fee.entity';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports:[TypeOrmModule.forFeature([UserEntity,UserClassEntity,UserFeeEntity]),AuthModule]
})
export class UserModule {}
