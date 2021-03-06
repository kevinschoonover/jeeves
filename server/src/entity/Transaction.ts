import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Account } from './Account';
import { Visit } from './Visit';
import { IsNumber, IsDate, ValidateNested } from 'class-validator';

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  public id: number;

  @ManyToOne((type) => Visit, (visit) => visit.transactions)
  @ValidateNested()
  public visit: Visit;

  @ManyToOne((type) => Account, (account) => account.transactions)
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
