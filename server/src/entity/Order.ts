import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Account } from './Account';
import { MenuItem } from './MenuItem';
import { Shift } from './Shift';
import { Visit } from './Visit';

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

  @ManyToOne((type) => Account, (account) => account.assignedOrders)
  @ValidateNested()
  public cookAssigned: Account;

  @Column()
  @IsString()
  public comments: string;

  @ManyToOne((type) => Shift, (shift) => shift.orders)
  public shift: Shift;

  @ManyToOne((type) => Visit, (visit) => visit.orders)
  @JoinTable()
  public visit: Visit;

  @ManyToMany((type) => MenuItem, (menuItem) => menuItem.orders)
  public menuItems: MenuItem[];
}
