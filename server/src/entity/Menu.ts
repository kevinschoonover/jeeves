import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { MenuItem } from './MenuItem'
import { Restaurant } from './Restaurant'

@Entity()
export class Menu extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    
    @OneToMany(()=>MenuItem, (menuitem)=>menuitem.menu)
    public menuItems: MenuItem[];

    @ManyToOne(() => Restaurant, (restaurant) => restaurant.menus)
    public restaurant: Restaurant;
 

    @CreateDateColumn()
    public dateJoined: Date;

    @Column({
        default: true
    })
    public isActive: boolean;
}
