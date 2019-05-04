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

import { IsArray, IsDate, IsNumber, ValidateNested } from 'class-validator';
import { Account } from './Account';
import { Order } from './Order';
import { Section } from './Section';
import { Visit } from './Visit';

@Entity()
export class Shift extends BaseEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  public id: number;

  @Column()
  @IsDate()
  public startTime: Date;

  @Column()
  @IsDate()
  public endTime: Date;

  @ManyToOne((type) => Account, (account) => account.shifts)
  @ValidateNested()
  public server: Account;

  @OneToMany((type) => Order, (order) => order.shift)
  @IsArray()
  public orders: Order[];

  @OneToMany((type) => Visit, (visit) => visit.assignee)
  @IsArray()
  public visits: Visit[];

  @ManyToMany((type) => Section, (section) => section.shifts)
  public sections: Section[];
}
