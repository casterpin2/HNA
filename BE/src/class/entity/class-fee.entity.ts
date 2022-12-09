import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';


@Entity('class_fee')
export class ClassFeeEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    name:string;
    @Column() 
    price: Number;
    @Column() 
    classId: string;
    @Column() 
    isDeleted: boolean;
}
