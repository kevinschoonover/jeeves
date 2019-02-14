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
} from 'typeorm';

import { Account } from './Account';
import { Section } from './Section';

@Entity()
export class Shift extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column()
  public startTime: Date;

  @Column()
  public endTime: Date;

  @ManyToOne((type) => Account, (account) => account.shifts)
  public server: Account;

  @ManyToOne((type) => Section, (section) => section.tables)
  public section: Section;
}
