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
  JoinColumn,
} from 'typeorm';

import { Service } from './Service';
import { Shift } from './Shift';
import { Transaction } from './Transaction';
import { Visit } from './Visit';
import { Restaurant } from './Restaurant';
import { Reservation } from './Reservation';
import { Review } from './Review';

@Entity()
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    length: 50,
  })
  public firstName: string;

  @Column({
    length: 50,
  })
  public lastName: string;

  @Column({
    unique: true,
  })
  public email: string;

  @Column({
    default: false,
    select: false,
  })
  public isSuperAdmin: boolean;

  @CreateDateColumn()
  public dateJoined: Date;

  @Column({
    default: true,
  })
  public isActive: boolean;

  @OneToMany((type) => Shift, (shift) => shift.server)
  public shifts: Shift[];


  @ManyToOne((type) => Transaction, (transaction) => transaction.user)
  public transactions: Transaction[];

  @ManyToOne((type) => Service, (service) => service.user)
  public services: Service[];

  @ManyToMany((type) => Visit, (visit) => visit.users)
  public visits: Visit[];

  @OneToMany((type) => Review, (review) => review.reviewer)
  public reviews: Review[];

  @ManyToMany((type) => Restaurant, (restaurant) => restaurant.managers)
  public restaurants: Restaurant[];

  @ManyToMany((type) => Reservation, (reservation) => reservation.guests)
  public reservations: Reservation[];
}
