import {
  IsArray,
  IsDate,
  IsNumber,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Account } from './Account';
import { Restaurant } from './Restaurant';
import { Table } from './Table';

@Entity()
export class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  public id: string;

  @CreateDateColumn()
  @IsDate()
  public dateCreated: Date;

  @Column()
  @IsDate()
  public startTime: Date;

  @Column({ default: 1 })
  @IsNumber()
  public numGuests: number;

  @OneToMany((type) => Table, (table) => table.reservations)
  @ValidateNested()
  public table: Table;

  @ManyToMany((type) => Account, (account) => account.reservations)
  @IsArray()
  public guests: Account[];

  @ManyToOne((type) => Restaurant, (restaurant) => restaurant.reservations)
  @ValidateNested()
  public restaurant: Restaurant;
}
