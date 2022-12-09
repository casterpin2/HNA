import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('user_role')
export class Role {
   

    @PrimaryColumn()
    id: number;
    @Column() 
    name: string;

}

