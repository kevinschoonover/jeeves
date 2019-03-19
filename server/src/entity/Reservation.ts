import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Restaurant } from './Restaurant';
import { Account } from './Account';
import {
  IsUUID,
  IsDate,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';

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

  @ManyToMany((type) => Account, (account) => account.reservations)
  @IsArray()
  public guests: Account[];

  @ManyToOne((type) => Restaurant, (restaurant) => restaurant.reservations)
  @ValidateNested()
  public restaurant: Restaurant;
}
