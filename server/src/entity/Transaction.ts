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
  UpdateDateColumn,
} from 'typeorm';
import { Account } from './Account';
import { Visit } from './Visit';

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @OneToMany((type) => Visit, (visit) => visit.transactions)
  public visit: Visit;

  @OneToMany((type) => Account, (account) => account.transactions)
  public user: Account;

  @CreateDateColumn()
  public time: Date;

  @Column()
  public cost: number;

  @Column()
  public tip: number;

  @Column()
  public tax: number;
}
