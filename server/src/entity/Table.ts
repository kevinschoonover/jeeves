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

export enum tableShapes {
  SQUARE = 'square',
  CIRCLE = 'circle',
  RECTANGLE = 'rectangle',
}

@Entity()
export class Table extends BaseEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  public id: number;

  @Column()
  @IsNumber()
  public seatingCapacity: number;

  @Column()
  @IsNumber()
  public x: number;

  @Column()
  @IsNumber()
  public y: number;

  @Column()
  @IsNumber()
  public rotation: number;

  @Column({
    default: tableShapes.SQUARE,
    enum: tableShapes,
    type: 'enum',
  })
  @IsEnum(tableShapes)
  public shape: string;

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

  @OneToMany((type) => Service, (service) => service.table)
  @IsArray()
  public services: Service[];

  @OneToMany((type) => Reservation, (reservation) => reservation.table)
  @IsArray()
  public reservations: Reservation[];

  @ManyToOne((type) => Section, (section) => section.tables)
  @ValidateNested()
  public section: Section;
}
