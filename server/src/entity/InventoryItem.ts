import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MenuItem } from './MenuItem';

export enum itemCategory {
  UNKNOWN = 'unknown',
  VEGETABLE = 'vegetable',
  MEAT = 'meat',
  DAILY = 'daily',
  FRUIT = 'fruit',
  OTHERs = 'other',
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
  @JoinTable()
  @IsArray()
  public menuItems: MenuItem[];
}
