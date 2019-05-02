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
import { IsNumber, ValidateNested, IsArray, IsDate } from 'class-validator';

export enum paymentMethod {
  SPLIT = 'split',
  ALTOGETHER = 'altogether',
}

@Entity()
export class Visit extends BaseEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  public id: string;

  @Column()
  @IsDate()
  public arrival: Date;

  @Column()
  @IsDate()
  public departure: Date;

  @ManyToOne((type) => Shift, (shift) => shift.visits)
  @ValidateNested()
  public assignee: Shift;

  @OneToMany((type) => Order, (order) => order.visit)
  @JoinTable()
  @IsArray()
  public orders: Order[];

  @OneToMany((type) => Transaction, (transaction) => transaction.visit)
  public transactions: Transaction[];

  @ManyToMany((type) => Account, (account) => account.visits)
  public users: Account[];

  @ManyToOne((type) => Restaurant, (restaurant) => restaurant.visits)
  public restaurant: Restaurant;
}
