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

@Entity()
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn()
  public dateReviewed: Date;

  @Column()
  public score: number;

  @Column({
    default: '',
  })
  public comment: string;

  @ManyToOne((type) => Restaurant, (restaurant) => restaurant.reviews)
  public restaurant: Restaurant;

  @ManyToOne((type) => MenuItem, (menuitem) => menuitem.reviews)
  public menuItem: MenuItem;

  @ManyToOne((type) => Account, (account) => account.reviews)
  public reviewer: Account;
}
