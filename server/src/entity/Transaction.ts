import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './Account';
import { Visit } from './Visit';
import { IsNumber, IsDate } from 'class-validator';

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  public id: number;

  @OneToMany((type) => Visit, (visit) => visit.transactions)
  public visit: Visit;

  @OneToMany((type) => Account, (account) => account.transactions)
  public user: Account;

  @CreateDateColumn()
  @IsDate()
  public time: Date;

  @Column()
  @IsNumber()
  public cost: number;

  @Column()
  @IsNumber()
  public tip: number;

  @Column()
  @IsNumber()
  public tax: number;
}
