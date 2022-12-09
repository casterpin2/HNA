import { BaseEntity } from 'src/common/entity/base.entity';
import { Column, Entity, Tree, TreeChildren, TreeParent } from 'typeorm';

@Entity({ name: 'menu_setting' })
@Tree('closure-table')
export class MenuSettingEntity extends BaseEntity {
  @Column({ nullable: false })
  title: string;

  @Column()
  url?: string;

  @Column({
    default: null,
  })
  priority?: number;

  @TreeParent()
  parent?: MenuSettingEntity;

  @TreeChildren({ cascade: true })
  children?: MenuSettingEntity[];
}
