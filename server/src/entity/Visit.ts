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

import { IsArray, IsDate, IsNumber, ValidateNested } from 'class-validator';
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
  @IsNumber()
  public id: string;

  @Column()
  @IsDate()
  public arrival: Date;

  @Column()
  @IsDate()
  public departure: Date;

  @OneToMany((type) => Shift, (shift) => shift.visits)
  @ValidateNested()
  public assignee: Shift;

  @OneToMany((type) => Order, (order) => order.visit)
  @JoinTable()
  @IsArray()
  public orders: Order[];

  @ManyToOne((type) => Transaction, (transaction) => transaction.visit)
  @IsArray()
  public transactions: Transaction[];

  @ManyToMany((type) => Account, (account) => account.visits)
  @IsArray()
  public users: Account[];
}
