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
import {
  IsOptional,
  IsString,
  IsBoolean,
  IsArray,
  IsDate,
  IsEnum,
  IsNumber,
} from 'class-validator';

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
  @IsString()
  public name: string;

  @Column({
    default: 0,
  })
  @IsNumber()
  public quantity: number;

  @Column({
    type: 'enum',
    enum: itemCategory,
    default: itemCategory.UNKNOWN,
  })
  @IsEnum(itemCategory)
  public category: itemCategory;

  @Column({ length: 50, default: 'default_logo.jpg', nullable: true })
  @IsString()
  public logoPath: string;

  @Column({ type: 'simple-array' })
  @IsArray()
  public allergens: string[];

  @CreateDateColumn()
  @IsDate()
  public dateCreated: Date;

  @Column({
    default: true,
  })
  @IsBoolean()
  public isActive: boolean;

  @ManyToMany((type) => MenuItem, (menuitem) => menuitem.ingredients)
  @IsArray()
  public menuItems: MenuItem[];
}
