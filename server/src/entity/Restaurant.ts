import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { Menu } from './Menu';

export enum cuisineTypes {
  AMERICAN = 'American',
  CHINESE = 'Chinese',
  JAPANESE = 'Japanese',
  MEXICAN = 'Mexican',
  CAJUN = 'Cajun',
  KOREAN = 'Korean',
  MEDITERRANEAN = 'Mediterranean',
  CUBAN = 'Cuban',
  MIDDLE_EASTERN = 'Middle Eastern',
  SUSHI_BAR = 'Sushi Bar',
  FRENCH = 'French',
  SANDWICH = 'Sandwich',
  STEAKHOUSE = 'Steakhouse',
  THAI = 'Thai',
  UNKNOWN = 'Unknown',
}

@Entity()
export class Restaurant extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    length: 50,
  })
  public name: string;

  @Column({
    unique: true,
    nullable: true,
  })
  public email: string;

  @Column({
    unique: true,
  })
  public address: string;

  @Column({
    type: 'simple-json',
    default: { lat: 37.95807, lon: -91.77349 },
    unique: true,
  })
  public location: {};

  @Column({
    default: null,
  })
  public imgPath: string;

  @Column({
    default: null,
  })
  public phoneNum: string;

  @Column({
    type: 'float',
    default: 0,
  })
  public review: number;

  @Column({
    type: 'enum',
    enum: cuisineTypes,
    default: cuisineTypes.AMERICAN,
  })
  public cuisineType: cuisineTypes;

  @Column({
    type: 'simple-json',
    default: {
      Monday: { startTime: '07:00', endTime: '21:00' },
      Tuesday: { startTime: '07:00', endTime: '21:00' },
      Wednesday: { startTime: '07:00', endTime: '21:00' },
      Thursday: { startTime: '07:00', endTime: '21:00' },
      Friday: { startTime: '07:00', endTime: '21:00' },
      Saturday: { startTime: '07:00', endTime: '21:00' },
      Sunday: { startTime: '07:00', endTime: '21:00' },
    },
  })
  public hours: {};

  @CreateDateColumn()
  public dateCreated: Date;

  @Column({
    default: true,
  })
  public isActive: boolean;

  @OneToMany(() => Menu, (menu) => menu.restaurant)
  public menus: Menu[];
}
