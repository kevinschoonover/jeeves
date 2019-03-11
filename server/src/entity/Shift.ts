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
import { Visit } from './Visit';
import { IsNumber, IsDate, IsArray, ValidateNested } from 'class-validator';

@Entity()
export class Shift extends BaseEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  public id: number;

  @Column()
  @IsDate()
  public startTime: Date;

  @Column()
  @IsDate()
  public endTime: Date;

  @ManyToOne((type) => Account, (account) => account.shifts)
  @ValidateNested()
  public server: Account;

  @ManyToOne((type) => Section, (section) => section.tables)
  @ValidateNested()
  public section: Section;

  @ManyToOne((type) => Visit, (visit) => visit.assignee)
  @IsArray()
  public visits: Visit[];
}
