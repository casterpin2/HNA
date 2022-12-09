import { IsNotEmpty, IsOptional } from 'class-validator';
import { CategoryLanguague } from 'src/common/utils';

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { HOMESTYLE } from './setting-homestyle.enum';
import {
  CRMSETTING,
  PENDINGORDER,
  STATUS,
  USERCREATECLASS,
} from './setting-status.enum';

@Entity({ name: 'setting' })
export class SettingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  webname: string;



  @Column({
    type: 'enum',
    enum: STATUS,
    default: STATUS.DEFAULT,
  })
  @IsOptional()
  status: STATUS;

  @Column({ nullable: true })
  fanpage: string;


  @Column({ nullable: true })
  google?: string;


  @Column({ nullable: true })
  logoUrl?: string;

  @Column({ nullable: true })
  aboutUs?: string;
  
  @Column({ nullable: true })
  address?: string;
  @Column({nullable:true})
  phone?:string
}
