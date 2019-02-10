import { Body, CurrentUser, Delete, Get, JsonController, OnUndefined, Param, Patch, Post, UnauthorizedError } from "routing-controllers";
import { EntityFromBody } from "typeorm-routing-controllers-extensions";

import { MenuItem } from "../entity/MenuItem";

@JsonController()
export class MenuItemController {

    @Get("/menuitems/")
    public async getAll() {
        return MenuItem.find();
    }


    @Post("/menuitems/")
    public save(@EntityFromBody() menuitem: MenuItem) {
        return menuitem.save();
    }


    @Get("/menuitems/:id/")
    public async get(@Param("id") id: string) {
        return MenuItem.findOne({ id });
    }


    @Patch("/menuitems/:id/")
    public async patch(@Param("id") id: string, @Body() menuitem: object) {
        await MenuItem.update(id, menuitem);
        return MenuItem.findOne({ id });
    }


    @Delete("/menuitems/:id/")
    @OnUndefined(204)
    public async remove(@Param("id") id: string) {
        return MenuItem.delete({ id });
    }
}
