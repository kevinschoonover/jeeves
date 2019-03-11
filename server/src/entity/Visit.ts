import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';

import { Account } from './Account';
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

  // TODO: insert orders here

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
  public transactions: Transaction[];
}
