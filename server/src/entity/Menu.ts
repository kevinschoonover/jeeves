import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { MenuItem } from './MenuItem';
import { Restaurant } from './Restaurant';
import {
  IsString,
  IsDate,
  IsBoolean,
  IsArray,
  ValidateNested,
} from 'class-validator';

@Entity()
export class Menu extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  public id: string;

  @CreateDateColumn()
  @IsDate()
  public dateJoined: Date;

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
