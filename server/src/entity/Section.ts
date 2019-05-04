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

import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Restaurant } from './Restaurant';
import { Shift } from './Shift';
import { Table } from './Table';

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

  @ManyToOne((type) => Restaurant, (restaurant) => restaurant.sections)
  @ValidateNested()
  public restaurant: Restaurant;

  @OneToMany((type) => Table, (table) => table.section)
  @IsArray()
  public tables: Table[];

  @ManyToMany((type) => Shift, (shift) => shift.sections)
  @JoinTable()
  @IsArray()
  public shifts: Shift[];
}
