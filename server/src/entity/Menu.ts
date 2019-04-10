import {
  IsArray,
  IsBoolean,
  IsDate,
  IsString,
  ValidateNested,
} from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { MenuItem } from './MenuItem';
import { Restaurant } from './Restaurant';

@Entity()
export class Menu extends BaseEntity {
  @PrimaryColumn()
  @IsString()
  public name: string;

  @CreateDateColumn()
  @IsDate()
  public dateCreated: Date;

  @Column({
    default: true,
  })
  @IsBoolean()
  public isActive: boolean;

  @OneToMany((type) => MenuItem, (menuitem) => menuitem.menu)
  @IsArray()
  public menuItems: MenuItem[];

  @ManyToOne((type) => Restaurant, (restaurant) => restaurant.menus)
  @ValidateNested()
  public restaurant: Restaurant;
}
