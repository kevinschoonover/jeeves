import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinTable } from "typeorm";
import { Menu } from './Menu'


export enum cuisineTypes {
    AMERICAN = "American",
    CHINESE = "Chinese",
    JAPANESE = "Japanese", 
    MEXICAN = "Mexican",
    //SEAFOOD = "Seafood",
    //CAJUN = "Cajun",
    //KOREAN = "Korean",
    //MEDITERRANEAN = "Meditterranean",
    //CUBAN = "Cuban",
    //MIDDLE_EASTERN = "Middle Eastern",
    //SUSHI_BAR = "Sushi Bar",
    //AMERICAN = "American",
    //FRENCH = "French",
    //DELIS = "Delis",
    //SANDWICH = "Sandwich",
    //BAGEL = "Bagel",
    //STEAKHOUSE = "Steakhouse",
    //THAI = "Thai",
    //UNKNOWN = "Unknown"

}


@Entity()
export class Restaurant extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({
        length: 50
    })
    public name: string;

    @Column({
        unique: true,
        nullable: true
    })
    public email: string;

    @Column({
        unique: true
    })
    public location: string;

    @Column({
        default: null
    })
    public imgPath: string;

    @Column({
        default: null
    })
    public phoneNum: string;

    @Column({
        type: "float",
        default: 0
    })
    public review: number;


    @Column({
        type: "enum",
        enum: cuisineTypes,
        default: cuisineTypes.AMERICAN
    })
    public cuisineType: cuisineTypes; 


    @Column({
        type: "simple-json",
        default: {
            Monday: "07:00 - 21:00",
            Tuesday: "07:00 - 21:00",
            Wednesday: "07:00 - 21:00",
            Thursday: "07:00 - 21:00",
            Friday: "07:00 - 21:00",
            Saturday: "07:00 - 21:00",
            Sunday: "07:00 - 21:00"
        }
    })
    public hours: {};


    @OneToMany(() => Menu, (menu) => menu.restaurant)
    public menus: Menu[];


    //  TO-DO
    //  relate to owner account
    //@ManyToOne(() => Account, (account) => account.restaurants)
    //public owner: Account;
    //  relate to seating
    //  derive average price
    //  attribute: amenities


    @CreateDateColumn()
    public dateJoined: Date;

    @Column({
        default: true
    })
    public isActive: boolean;
}
