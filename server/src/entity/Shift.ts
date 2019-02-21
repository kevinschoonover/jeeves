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
} from 'typeorm';

import { Account } from './Account';
import { Order } from './Order';
import { Section } from './Section';
import { Visit } from './Visit';

@Entity()
export class Shift extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public startTime: Date;

  @Column()
  public endTime: Date;

  @OneToMany((type) => Order, (order) => order.shift)
  public orders: Order[];

  @OneToMany((type) => Visit, (visit) => visit.assignee)
  public visits: Visit[];

  @ManyToOne((type) => Account, (account) => account.shifts)
  public server: Account;

  @ManyToMany((type) => Section, (section) => section.shifts)
  public sections: Section[];
}
