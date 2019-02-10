import { Body, CurrentUser, Delete, Get, JsonController, OnUndefined, Param, Patch, Post, UnauthorizedError } from "routing-controllers";
import { EntityFromBody } from "typeorm-routing-controllers-extensions";

import { Menu } from "../entity/Menu";

@JsonController()
export class MenuController {

    @Get("/menus/")
    public async getAll() {
        return Menu.find();
    }

    @Post("/menus/")
    public save(@EntityFromBody() menu: Menu) {
        return menu.save();
    }

    @Get("/menus/:id/")
    public async get(@Param("id") id: string) {
        return Menu.findOne({ id });
    }

    @Patch("/menus/:id/")
    public async patch(@Param("id") id: string, @Body() menu: object) {
        await Menu.update(id, menu);
        return Menu.findOne({ id });
    }



    @Delete("/menus/:id/")
    @OnUndefined(204)
    public async remove(@Param("id") id: string) {
        return Menu.delete({ id });
    }
}
