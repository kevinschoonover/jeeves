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

import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  ValidateNested,
} from 'class-validator';

import { Reservation } from './Reservation';
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

  @Column({
    default: false,
  })
  @IsBoolean()
  public kidFriendly: boolean;

  @ManyToOne((type) => Service, (service) => service.table)
  @IsArray()
  public services: Service[];

  @ManyToOne((type) => Reservation, (service) => reservation.table)
  @IsArray()
  public reservations: Reservation[];

  @ManyToOne((type) => Section, (section) => section.tables)
  @ValidateNested()
  public section: Section;
}
