import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user_fee')
export class UserFeeEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    userId:string;
    @Column() 
    feeId: string;
    @Column()
    isChecked:Boolean;
    @Column()
    isDeleted:Boolean;
}
