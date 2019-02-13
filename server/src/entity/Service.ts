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
  PrimaryColumn,
} from 'typeorm';

export enum serviceType {
  REFILL_DRINK = 'refill_drink',
  TAKE_ORDER = 'take_order',
  UNKNOWN = 'unknown',
}

@Entity()
export class Service extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: string;

  @PrimaryColumn()
  public userId: string;

  @PrimaryColumn()
  public tableId: string;

  @Column()
  public type: serviceType;
}
