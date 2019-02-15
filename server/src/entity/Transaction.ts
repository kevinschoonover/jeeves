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
import { Visit } from './Visit';

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: string;

  @PrimaryColumn()
  public visitId: string;

  @PrimaryColumn()
  public userId: string;

  @OneToMany((type) => Visit, (visit) => visit.transactions)
  public visit: Visit;

  @PrimaryColumn()
  public time: Date;

  @Column()
  public cost: number;

  @Column()
  public tip: number;

  @Column()
  public tax: number;

  @Column()
  public total: number;
}
