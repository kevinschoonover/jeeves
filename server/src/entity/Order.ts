import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

import { MenuItem } from './MenuItem';
import { Shift } from './Shift';
import { Visit } from './Visit';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne((type) => Shift, (shift) => shift.orders)
  public shift: Shift;

  @ManyToOne((type) => Visit, (visit) => visit.orders)
  public visit: Visit;

  @ManyToMany((type) => MenuItem, (menuItem) => menuItem.orders)
  public menuItems: MenuItem[];
}
