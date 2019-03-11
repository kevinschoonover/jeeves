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
import { IsNumber, IsDate, ValidateNested } from 'class-validator';

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  public id: number;

  @OneToMany((type) => Visit, (visit) => visit.transactions)
  @ValidateNested()
  public visit: Visit;

  @OneToMany((type) => Account, (account) => account.transactions)
  @ValidateNested()
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
