import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user_class')
export class UserClassEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    userId:string;
    @Column() 
    classId: string;
    @Column()
    isDeleted:Boolean
}
