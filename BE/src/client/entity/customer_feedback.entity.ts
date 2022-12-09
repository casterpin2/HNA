import { ArticleCategoryStatus } from 'src/article/entity/article-category-status.enum';
import { BaseEntity } from 'src/common/entity/base.entity';
import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';

@Entity({name: 'customer_feedback'})
export class CustomerFeebackEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @DeleteDateColumn()
    deletedAt: string;
    @Column({ nullable: false })
    customerName: string;

    @Column({ nullable: false })
    avatar: string;

    @Column({ nullable: true })
    content: string;
    @Column({
        type: 'enum',
        enum: ArticleCategoryStatus,
        default: ArticleCategoryStatus.ACTIVE,
    })
    status: ArticleCategoryStatus;
}
