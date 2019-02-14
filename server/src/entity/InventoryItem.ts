import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  PrimaryColumn,
} from 'typeorm';
import { MenuItem } from './MenuItem';

export enum itemCategory {
  UNKNOWN = 'Unknown',
  VEGETABLE = 'Vegetable',
  MEAT = 'Meat',
  DAILY = 'Daily',
  FRUIT = 'Fruit',
  OTHERs = 'Others',
}

@Entity()
export class InventoryItem extends BaseEntity {
  @PrimaryColumn()
  public name: string;

  @Column({
    default: 0,
  })
  public quantity: number;

  @Column({
    type: 'enum',
    enum: itemCategory,
    default: itemCategory.UNKNOWN,
  })
  public category: itemCategory;

  @Column({ length: 50, default: 'default_logo.jpg', nullable: true })
  public logoPath: string;

  @Column({ type: 'simple-array' })
  public allergens: string[];

  @CreateDateColumn()
  public dateCreated: Date;

  @Column({
    default: true,
  })
  public isActive: boolean;

  @ManyToMany((type) => MenuItem, (menuitem) => menuitem.ingredients)
  public menuItems: MenuItem[];
}
