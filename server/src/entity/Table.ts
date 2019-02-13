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

import { Section } from './Section';

export enum tableStatus {
  OPEN = 'open',
  ORDERING = 'ordering',
  EATING = 'eating',
  CLEANING = 'cleaning',
}

@Entity()
export class Table extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public seatingCapacity: number;

  @Column({
    default: tableStatus.OPEN,
    enum: tableStatus,
    type: 'enum',
  })
  public status: tableStatus;

  @Column({
    default: false,
  })
  public kidFriendly: boolean;

  @ManyToOne((type) => Section, (section) => section.tables)
  public section: Section;
}
