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

  @Column({
    default: 0,
  })
  public restaurantReviewScore: number;

  @Column({
    default: '',
  })
  public restaurantReviewComment: string;

  @Column({
    default: 0,
  })
  public itemReviewScore: number;

  @Column({
    default: '',
  })
  public itemReviewComment: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.reviews)
  public restaurant: Restaurant;

  @ManyToOne(() => MenuItem, (menuitem) => menuitem.reviews)
  public menuItem: MenuItem;

  @ManyToOne(() => Account, (account) => account.reviews)
  public reviewer: Account;
}
