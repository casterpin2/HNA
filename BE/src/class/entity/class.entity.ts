import { UserEntity } from "src/user/entity/user.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('class')
export class ClassEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column() 
    name: string;
    @Column() 
    startDate: Date;
    @Column() 
    endDate: Date;
    @Column()
    teacherId: string;
    @Column() 
    isDeleted: boolean;
}

