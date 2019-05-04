import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {
  IsDate,
  IsNumber,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Account } from './Account';
import { MenuItem } from './MenuItem';
import { Restaurant } from './Restaurant';

@Entity()
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

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
