import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Shift } from './Shift';
import { Table } from './Table';
import { IsNumber, IsString, IsArray } from 'class-validator';

@Entity()
export class Section extends BaseEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  public id: number;

  @Column({
    length: 50,
  })
  @IsString()
  public name: string;

  @OneToMany((type) => Shift, (shift) => shift.section)
  @IsArray()
  public shifts: Shift[];

  @OneToMany((type) => Table, (table) => table.section)
  @IsArray()
  public tables: Table[];

  @ManyToMany((type) => Shift, (shift) => shift.sections)
  public shifts: Shift[];
}
