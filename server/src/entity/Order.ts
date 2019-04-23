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
import { IsBoolean, IsDate, IsEnum, IsNumber } from 'class-validator';

export enum orderStatus {
  CREATED = 'created',
  PROCESSING = 'processing',
  DONE = 'done',
}

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column({
    type: 'enum',
    enum: orderStatus,
    default: orderStatus.CREATED,
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

  @ManyToOne((type) => Shift, (shift) => shift.orders)
  public shift: Shift;

  @ManyToOne((type) => Visit, (visit) => visit.orders)
  @JoinTable()
  public visit: Visit;

  @ManyToMany((type) => MenuItem, (menuItem) => menuItem.orders)
  public menuItems: MenuItem[];
}
