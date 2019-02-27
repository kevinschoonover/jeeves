import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  IsNull,
} from 'typeorm';
import { InventoryItem } from './InventoryItem';
import { Menu } from './Menu';
import { Review } from './Review';
import {
  IsString,
  IsNumber,
  IsJSON,
  IsEnum,
  IsDate,
  IsBoolean,
  IsArray,
  IsOptional,
} from 'class-validator';
import { isString } from 'util';

export enum itemCategorys {
  STARTER = 'starter',
  SOUP = 'soup',
  BURGER = 'burger',
  SANDWICH = 'sandwich',
  SNACK = 'snack',
  DESSERT = 'dessert',
  BEVERAGE = 'beverage',
  SIDE = 'side',
  ALCOHOL = 'alcohol',
  APPETIZER = 'appetizer',
  ENTREE = 'entree',
  SEAFOOD = 'seafood',
  VEGETARIAN = 'vegetarian',
  KIDS = 'kids',
  UNKNOWN = 'unknown',
}

export enum servingSizeUnits {
  CUP = 'cup',
  CONTAINER = 'container',
  PLATE = 'plate',
  UNIT = 'unit',
  BAR = 'bar',
  BOTTER = 'bottle',
  GLASS = 'glass',
  POUND = 'pound(s)',
  BOWL = 'bowl',
  GRAM = 'gram(s)',
  DOZEN = 'dozen',
}

@Entity()
export class MenuItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  public id: string;

  @Column({
    length: 50,
  })
  @IsString()
  public itemName: string;

  @Column('float')
  @IsNumber()
  public price: number;

  @Column({
    type: 'simple-json',
    nullable: true,
  })
  @IsJSON()
  public nutrition: {};

  @Column({
    default: 0,
  })
  @IsNumber()
  public allTimeSold: number;

  @Column({
    default: 0,
  })
  @IsNumber()
  public todaySold: number;

  @Column({
    default: 1,
  })
  @IsNumber()
  public servingSize: number;

  @Column({
    default: 15,
  })
  @IsNumber()
  public PrepETA: number;

  @Column({
    default: 0,
  })
  @IsNumber()
  public spicyLevel: number;

  @Column({
    default: 'default.jpg',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  public imgPath: string;

  @Column({
    type: 'enum',
    enum: itemCategorys,
    default: itemCategorys.UNKNOWN,
  })
  @IsEnum(itemCategorys)
  public itemCategory: itemCategorys;

  @Column({
    type: 'enum',
    enum: servingSizeUnits,
    default: servingSizeUnits.UNIT,
  })
  @IsEnum(servingSizeUnits)
  public servingSizeUnits: servingSizeUnits;

  @CreateDateColumn()
  @IsDate()
  public dateCreated: Date;

  @Column({
    default: true,
  })
  @IsBoolean()
  public isActive: boolean;

  @OneToMany((type) => Review, (review) => review.menuItem)
  @IsArray()
  @IsOptional()
  public reviews: Review[];

  @ManyToOne((type) => Menu, (menu) => menu.menuItems)
  public menu: Menu;

  @ManyToMany(
    (type) => InventoryItem,
    (inventoryitem) => inventoryitem.menuItems
  )
  @IsArray()
  public ingredients: InventoryItem[];
}
