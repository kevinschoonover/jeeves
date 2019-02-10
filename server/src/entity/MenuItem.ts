import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { Menu } from './Menu'

export enum itemCategorys {
    STARTER = "starter",
    SOUP = "soup",
    BURGER = "burger",
    SANDWICH = "sandwich",
    SNACK = "snack",
    DESSERT = "dessert",
    BEVERAGE = "beverage",
    SIDE = "side",
    ALCOHOL = "alcohol",
    APPETIZER = "appetizer",
    ENTREE = "entree",
    SEAFOOD = "seafood",
    VEGETARIAN = "vegetarian",
    KIDS = "kids",
    UNKNOWN = "unknown"
}

export enum servingSizeUnits {
    CUP = "cup",
    CONTAINER = "container",
    PLATE = "plate",
    UNIT = "unit",
    BAR = "bar",
    BOTTER = "bottle",
    GLASS = "glass",
    POUND = "pound(s)",
    BOWL = "bowl",
    GRAM = "gram(s)",
    DOZEN = "dozen"
}

@Entity()
export class MenuItem extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({
        length: 50
    })
    public itemName: string;

    @Column("float")
    public price: number;

    @Column({
        type: "simple-array",
        default: []
    })
    ingredients: string[];

    @Column({
        type: "simple-json",
        default: {
            totalFat: -1,
            cholesterol: -1,
            sodium: -1,
            totalCarbohydrate: -1,
            sugar: -1,
            fiber: -1,
            protein: -1,
            vitaminA: -1,
            vitaminC: -1,
            vitaminD: -1,
            iron: -1,
            calcium: -1,
            potassium: -1
        }
    })
    public nutritions: {};

    @ManyToOne(() => Menu, (menu) => menu.menuItems)
    public menu: Menu;

    @Column({
        default: 0
    })
    public allTimeSold: number;

    @Column({
        default: 0
    })
    public todaySold: number;


    @Column({
        default: 1
    })
    public servingSize: number;

    @Column({
        default: 15
    })
    public PrepETA: number;

    @Column({
        default: 0
    })
    public review: number;

    @Column({
        default: 0
    })
    public spicyLevel: number;

    @Column({
        default: null
    })
    public imgPath: string;

    @Column({
        type: "enum",
        enum: itemCategorys,
        default: itemCategorys.UNKNOWN
    })
    public itemCategory: itemCategorys;  



    @Column({
        type: "enum",
        enum: servingSizeUnits,
        default: servingSizeUnits.UNIT
    })
    public servingSizeUnits:servingSizeUnits;


    @CreateDateColumn()
    public dateJoined: Date;

    @Column({
        default: true
    })
    public isActive: boolean;
}
