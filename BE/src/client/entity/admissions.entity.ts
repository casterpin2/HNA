import { ArticleCategoryStatus } from 'src/article/entity/article-category-status.enum';
import { BaseEntity } from 'src/common/entity/base.entity';
import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';

@Entity({name: 'admissions'})
export class AdmissionsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @DeleteDateColumn()
    deletedAt: string;
    @Column({ nullable: false })
    fullname: string;

    @Column({ nullable: false })
    phoneno: string;

    @Column({ nullable: true })
    message: string;
    @Column({ nullable: true })
    email: string;
}
