import {
  BaseEntity,
  Column,
  Entity,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Account } from './Account';
import { Restaurant } from './Restaurant';
import { MenuItem } from './MenuItem';
import {
  IsUUID,
  IsDate,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

@Entity()
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  public id: string;

  @CreateDateColumn()
  @IsDate()
  public dateReviewed: Date;

  @Column()
  @IsNumber()
  public score: number;

  @Column({
    default: '',
  })
  @IsString()
  public comment: string;

  @ManyToOne((type) => Restaurant, (restaurant) => restaurant.reviews)
  @ValidateNested()
  public restaurant: Restaurant;

  @ManyToOne((type) => MenuItem, (menuitem) => menuitem.reviews)
  @ValidateNested()
  public menuItem: MenuItem;

  @ManyToOne((type) => Account, (account) => account.reviews)
  @ValidateNested()
  public reviewer: Account;
}
