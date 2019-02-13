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

@Entity()
export class Section extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: number;

  @Column({
    length: 50,
  })
  public name: string;

  @OneToMany((type) => Shift, (shift) => shift.section)
  public shifts: Shift[];

  @OneToMany((type) => Table, (table) => table.section)
  public tables: Table[];
}
