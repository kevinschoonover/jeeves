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

import { Shift } from './Shift';
import { Restaurant } from './Restaurant';
import { Reservation } from './Reservation';

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

  @OneToMany(() => Shift, (shift) => shift.server)
  public shifts: Shift[];

  @ManyToMany(() => Restaurant, (restaurant) => restaurant.managers)
  public restaurants: Restaurant[];

  @ManyToMany(() => Reservation, (reservation) => reservation.guests)
  public reservations: Reservation[];
}
