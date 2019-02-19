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

  @OneToMany((type) => Shift, (shift) => shift.visits)
  public assignee: Shift;

  @ManyToOne((type) => Order, (order) => order.shift)
  public orders: Order[];

  @ManyToOne((type) => Transaction, (transaction) => transaction.visit)
  public transactions: Transaction[];

  @ManyToMany((type) => Account, (account) => account.visits)
  public users: Account[];
}
