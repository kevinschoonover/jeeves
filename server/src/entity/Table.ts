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
import { Service } from './Service';

export enum tableStatus {
  OPEN = 'open',
  ORDERING = 'ordering',
  EATING = 'eating',
  CLEANING = 'cleaning',
}

@Entity()
export class Table extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public seatingCapacity: number;

  @Column({
    default: tableStatus.OPEN,
    enum: tableStatus,
    type: 'enum',
  })
  public status: tableStatus;

  @ManyToOne((type) => Service, (service) => service.table)
  public services: Service[];

  @Column({
    default: false,
  })
  public kidFriendly: boolean;

  @ManyToOne((type) => Section, (section) => section.tables)
  public section: Section;
}
