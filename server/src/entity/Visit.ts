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
import { IsNumber, IsArray, IsDate, ValidateNested } from 'class-validator';

export enum paymentMethod {
  SPLIT = 'split',
  ALTOGETHER = 'altogether',
}

@Entity()
export class Visit extends BaseEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  public id: number;

  @ManyToMany((type) => Account, (account) => account.visits)
  @IsArray()
  public users: Account[];

  @OneToMany((type) => Shift, (shift) => shift.visits)
  @ValidateNested()
  public assignee: Shift;

  @Column()
  @IsDate()
  public arrival: Date;

  @Column()
  @IsDate()
  public departure: Date;


  @ManyToOne((type) => Transaction, (transaction) => transaction.visit)
  @IsArray()

  @OneToMany((type) => Order, (order) => order.shift)
  public orders: Order[];

  @OneToMany((type) => Transaction, (transaction) => transaction.visit)

  public transactions: Transaction[];

  @ManyToOne((type) => Shift, (shift) => shift.visits)
  public assignee: Shift;

  @ManyToMany((type) => Account, (account) => account.visits)
  public users: Account[];
}
