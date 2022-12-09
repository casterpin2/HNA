import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserClassEntity } from './user-class.entity';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column() 
    username: string;
    @Column() 
    password: string;
    @Column() 
    fullName: string;
    @Column() 
    phoneNumber: string;
    @Column() 
    avatar: string;
    @Column() 
    role: number;
    @Column() 
    email: string;
    @Column()
    isDeleted: boolean;

}
