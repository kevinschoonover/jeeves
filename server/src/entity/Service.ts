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
  SERVE_FOOD = 'serve_food',
  TAKE_ORDER = 'take_order',
  CHECK_ON_TABLE = 'check_on_table',
  ALLERGEN_ASSISTANCE = 'allergen_assistance',
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

  @Column({
    default: serviceType.UNKNOWN,
    enum: serviceType,
    type: 'enum',
  })
  public type: serviceType;
}
