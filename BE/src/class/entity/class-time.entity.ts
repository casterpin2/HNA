import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';


@Entity('class_time')
export class ClassTimeEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    date:Date;
    @Column() 
    isPresent: Boolean;
    @Column() 
    userId: string;
    @Column() 
    classId: string;
}
