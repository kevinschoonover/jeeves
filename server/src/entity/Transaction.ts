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

  @OneToOne((type) => Visit, (visit) => visit.id)
  public visitId: number;

  @OneToOne((type) => Account, (account) => account.id)
  public userId: string;

  @OneToMany((type) => Visit, (visit) => visit.transactions)
  public visit: Visit;

  @CreateDateColumn()
  public time: Date;

  @Column()
  public cost: number;

  @Column()
  public tip: number;

  @Column()
  public tax: number;
}
