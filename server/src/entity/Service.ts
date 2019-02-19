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
  PrimaryColumn,
  OneToOne,
} from 'typeorm';
import { Account } from './Account';
import { Table, tableStatus } from './Table';

export enum serviceType {
  REFILL_DRINK = 'refill_drink',
  SERVE_FOOD = 'serve_food',
  TAKE_ORDER = 'take_order',
  CHECK_ON_TABLE = 'check_on_table',
  ALLERGEN_ASSISTANCE = 'allergen_assistance',
  UNKNOWN = 'unknown',
}

@Entity()
export class Service extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @OneToMany((type) => Account, (account) => account.services)
  public user: Account;

  @OneToMany((type) => Table, (table) => table.services)
  public table: Table;

  @Column({
    default: serviceType.UNKNOWN,
    enum: serviceType,
    type: 'enum',
  })
  public type: serviceType;
}
