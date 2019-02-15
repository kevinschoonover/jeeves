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

export enum paymentMethod {
  SPLIT = 'split',
  ALTOGETHER = 'altogether',
}

@Entity()
export class Visit extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToMany((type) => Account, (account) => account.visits)
  public users: Account[];

  // TODO: insert orders here

  @OneToMany((type) => Shift, (shift) => shift.visits)
  public assignee: Shift;

  @Column()
  public arrival: Date;

  @Column()
  public departure: Date;

  @ManyToOne((type) => Transaction, (transaction) => transaction.visit)
  public transactions: Transaction[];

  @Column({
    default: paymentMethod.ALTOGETHER,
    enum: paymentMethod,
    type: 'enum',
  })
  public methodOfPayment: paymentMethod;
}
