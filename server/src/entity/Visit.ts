import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Account } from './Account';
import { Order } from './Order';
import { Shift } from './Shift';
import { Transaction } from './Transaction';
import { Restaurant } from './Restaurant';

export enum paymentMethod {
  SPLIT = 'split',
  ALTOGETHER = 'altogether',
}

@Entity()
export class Visit extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public arrival: Date;

  @Column()
  public departure: Date;

  @OneToMany((type) => Order, (order) => order.visit)
  public orders: Order[];

  @OneToMany((type) => Transaction, (transaction) => transaction.visit)
  public transactions: Transaction[];

  @ManyToOne((type) => Shift, (shift) => shift.visits)
  public assignee: Shift;

  @ManyToMany((type) => Account, (account) => account.visits)
  public users: Account[];

  @ManyToOne((type) => Restaurant, (restaurant) => restaurant.visits)
  public restaurant: Restaurant;
}
