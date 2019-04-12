import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsJSON,
  IsMobilePhone,
  IsNumber,
  IsString,
} from 'class-validator';

import { Account } from './Account';
import { Menu } from './Menu';
import { Reservation } from './Reservation';
import { Review } from './Review';
import { Section } from './Section';
import { Visit } from './Visit';

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
  @IsString()
  public id: string;

  @Column({
    length: 50,
  })
  @IsString()
  public name: string;

  @Column({
    unique: true,
    nullable: true,
  })
  @IsString()
  public email: string;

  @Column({
    unique: true,
  })
  @IsString()
  public address: string;

  @Column({
    type: 'simple-json',
    default: { lat: 37.95807, lon: -91.77349 },
    unique: true,
  })
  @IsJSON()
  public location: {};

  @Column({
    default: 'default_img.jpg',
  })
  @IsString()
  public imgPath: string;

  @Column({
    default: null,
  })
  @IsMobilePhone('en-US')
  public phoneNum: string;

  @Column({
    type: 'float',
    default: 0,
  })
  @IsNumber()
  public review: number;

  @Column({
    type: 'enum',
    enum: cuisineTypes,
    default: cuisineTypes.AMERICAN,
  })
  @IsEnum(cuisineTypes)
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
  @IsJSON()
  public hours: {};

  @CreateDateColumn()
  @IsDate()
  public dateCreated: Date;

  @Column({
    default: true,
  })
  @IsBoolean()
  public isActive: boolean;

  @Column({
    default: false,
  })
  @IsBoolean()
  public hasWifi: boolean;

  @Column({
    default: false,
  })
  @IsBoolean()
  public hasTV: boolean;

  @Column({
    default: false,
  })
  @IsBoolean()
  public hasParking: boolean;

  @OneToMany((type) => Menu, (menu) => menu.restaurant)
  @IsArray()
  public menus: Menu[];

  @OneToMany((type) => Review, (review) => review.restaurant)
  @IsArray()
  public reviews: Review[];

  @OneToMany((type) => Section, (section) => section.restaurant)
  @IsArray()
  public sections: Section[];

  @ManyToMany((type) => Account, (account) => account.restaurants)
  @IsArray()
  public managers: Account[];

  @OneToMany((type) => Reservation, (reservation) => reservation.restaurant)
  @IsArray()
  public reservations: Reservation[];

  @OneToMany((type) => Visit, (visit) => visit.restaurant)
  public visits: Visit[];
}
