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

  @ManyToOne((type) => Account, (account) => account.shifts)
  public server: Account;

  @ManyToOne((type) => Section, (section) => section.tables)
  public section: Section;

  @ManyToOne((type) => Order, (order) => order.shift)
  public orders: Order[];

  @ManyToOne((type) => Visit, (visit) => visit.assignee)
  public visits: Visit[];
}
