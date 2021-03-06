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

import {
  IsArray,
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Order } from './Order';
import { Reservation } from './Reservation';
import { Restaurant } from './Restaurant';
import { Review } from './Review';
import { Service } from './Service';
import { Shift } from './Shift';
import { Transaction } from './Transaction';
import { Visit } from './Visit';

@Entity()
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    length: 50,
  })
  @IsString()
  public firstName: string;

  @Column({
    length: 50,
  })
  @IsString()
  public lastName: string;

  @Column({
    unique: true,
  })
  @IsString()
  public email: string;

  @Column({
    default: false,
    select: false,
  })
  @IsBoolean()
  public isSuperAdmin: boolean;

  @CreateDateColumn()
  @IsDate()
  public dateJoined: Date;

  @Column({
    default: true,
  })
  @IsBoolean()
  public isActive: boolean;

  @OneToMany((type) => Shift, (shift) => shift.server)
  @IsArray()
  public shifts: Shift[];

  @OneToMany((type) => Order, (order) => order.cookAssigned)
  @ValidateNested()
  public assignedOrders: Order[];

  @ManyToOne((type) => Transaction, (transaction) => transaction.user)
  @IsArray()
  @IsOptional()
  public transactions: Transaction[];

  @ManyToOne((type) => Service, (service) => service.user)
  @IsArray()
  @IsOptional()
  public services: Service[];

  @ManyToMany((type) => Visit, (visit) => visit.users)
  @JoinTable()
  @IsArray()
  @IsOptional()
  public visits: Visit[];

  @OneToMany((type) => Review, (review) => review.reviewer)
  @IsArray()
  @IsOptional()
  public reviews: Review[];

  @ManyToMany((type) => Restaurant, (restaurant) => restaurant.managers)
  @IsArray()
  @IsOptional()
  public restaurants: Restaurant[];

  @ManyToMany((type) => Reservation, (reservation) => reservation.guests)
  @IsArray()
  @IsOptional()
  public reservations: Reservation[];
}
