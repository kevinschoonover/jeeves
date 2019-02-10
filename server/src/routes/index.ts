// Basic Routes
import * as Koa from "koa";
import * as Router from "koa-router";


import { createConnection } from "typeorm";
import { Menu } from "../entity/Menu";
import { MenuItem, itemCategorys } from "../entity/MenuItem";


createConnection().then(
    async connection => {
        //const menuItem1 = new MenuItem();
        //menuItem1.itemName = "a";
        //menuItem1.itemCategory = itemCategorys.STARTER;
        //menuItem1.price = 99.98;
        //menuItem1.servingSize = 100;
        //await connection.manager.save(menuItem1);

        //const menuItem2 = new MenuItem();
        //menuItem2.itemName = "b";
        //menuItem2.itemCategory = itemCategorys.SEAFOOD;
        //menuItem2.price = 299.99;
        //menuItem2.servingSize = 10;
        //await connection.manager.save(menuItem2);

        //const menu1 = new Menu();
        //menu1.menuItems = [menuItem1, menuItem2];
        //await connection.manager.save(menu1);

        const menuItemsRepo = connection.getRepository(MenuItem);
        const menuItems = await menuItemsRepo.find({ relations: ["menu"] })
        console.log("menuItems", menuItems);
    }
).catch(error => console.log(error))

const router = new Router();

/**
 * Base route, return a 401
 */
router.get("", async (ctx: Koa.ParameterizedContext) => {
  ctx.body = "Hello, World!";
  ctx.status = 200;
});

/**
 * Basic healthcheck
 */
router.get("healthcheck/", async (ctx: Koa.ParameterizedContext) => {
  ctx.body = "OK";
  ctx.status = 200;
});

export { router };
