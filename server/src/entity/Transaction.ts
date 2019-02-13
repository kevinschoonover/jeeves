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

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: string;

  @PrimaryColumn()
  public visitId: string;

  @PrimaryColumn()
  public userId: string;

  @PrimaryColumn()
  public time: Date;

  @Column()
  public cost: number;

  @Column()
  public tip: number;

  @Column()
  public tax: number;

  @Column()
  public total: number;
}
