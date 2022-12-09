import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFeeEntity } from 'src/user/entity/user-fee.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { ClassFeeEntity } from './entity/class-fee.entity';
import { ClassTimeEntity } from './entity/class-time.entity';
import { ClassEntity } from './entity/class.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ClassEntity,UserEntity,ClassFeeEntity,ClassTimeEntity,UserFeeEntity])],
  providers: [ClassService],
  controllers: [ClassController],

})
export class ClassModule {}
