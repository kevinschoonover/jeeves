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

@Entity()
export class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn()
  public dateJoined: Date;

  @Column()
  public startTime: Date;

  @Column({ default: 0 })
  public numGuests: number;

  @Column({
    default: true,
  })
  public isActive: boolean;

  @ManyToMany(() => Account, (account) => account.reservations)
  public guests: Account[];

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.reservations)
  public restaurant: Restaurant;
}
