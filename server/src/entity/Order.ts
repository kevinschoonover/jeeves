import {
  BaseEntity,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinTable,
  Column,
  CreateDateColumn,
} from 'typeorm';

import { MenuItem } from './MenuItem';
import { Shift } from './Shift';
import { Visit } from './Visit';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  ValidateNested,
  IsString,
} from 'class-validator';
import { Account } from './Account';

export enum orderStatus {
  RECEIVE = 'receive',
  PREP = 'prep',
  COOK = 'cook',
  READY = 'ready',
}

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column({
    type: 'enum',
    enum: orderStatus,
    default: orderStatus.RECEIVE,
  })
  @IsEnum(orderStatus)
  public prepStatus: orderStatus;

  @Column({
    default: 10,
  })
  @IsNumber()
  public orderETA: number;

  @CreateDateColumn()
  @IsDate()
  public start: Date;

  @Column({
    nullable: true,
  })
  @IsDate()
  public end: Date;

  @Column({ nullable: true })
  @IsString()
  public comments: string;

  @ManyToOne((type) => Account, (account) => account.orders)
  public cookAssigned: Account;

  @ManyToOne((type) => Shift, (shift) => shift.orders)
  public shift: Shift;

  @ManyToOne((type) => Visit, (visit) => visit.orders)
  @JoinTable()
  public visit: Visit;

  @ManyToMany((type) => MenuItem, (menuItem) => menuItem.orders)
  public menuItems: MenuItem[];
}
