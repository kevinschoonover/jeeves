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
import { IsNumber, IsEnum, IsArray, IsBoolean } from 'class-validator';

export enum tableStatus {
  OPEN = 'open',
  ORDERING = 'ordering',
  EATING = 'eating',
  CLEANING = 'cleaning',
}

@Entity()
export class Table extends BaseEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  public id: number;

  @Column()
  @IsNumber()
  public seatingCapacity: number;

  @Column({
    default: tableStatus.OPEN,
    enum: tableStatus,
    type: 'enum',
  })
  @IsEnum(tableStatus)
  public status: tableStatus;

  @ManyToOne((type) => Service, (service) => service.table)
  @IsArray()
  public services: Service[];

  @Column({
    default: false,
  })
  @IsBoolean()
  public kidFriendly: boolean;

  @ManyToOne((type) => Section, (section) => section.tables)
  public section: Section;
}
