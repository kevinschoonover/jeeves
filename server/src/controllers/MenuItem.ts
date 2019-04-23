import {
  Body,
  Delete,
  Get,
  JsonController,
  OnUndefined,
  Param,
  Patch,
  Post,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { EntityFromBody } from 'typeorm-routing-controllers-extensions';

import { MenuItem } from '../entity/MenuItem';

const relations = ['orders'];

@JsonController()
export class MenuItemController {
  @Get('/menuitems/')
  @OpenAPI({
    summary: 'Returns all menu items created in the database',
  })
  @ResponseSchema(MenuItem)
  public async getAll() {
    return MenuItem.find({ relations });
  }

  @Post('/menuitems/')
  @OpenAPI({
    summary: 'Create a menu item',
  })
  @ResponseSchema(MenuItem, {
    contentType: 'application/json',
    description: 'A list of created menu items',
    statusCode: '201',
  })
  public save(@EntityFromBody() menuitem: MenuItem) {
    return menuitem.save();
  }

  @Get('/menuitems/:id/')
  @OpenAPI({
    summary: 'Return the menu item associated with id',
  })
  @ResponseSchema(MenuItem)
  public async get(@Param('id') id: string) {
    return MenuItem.findOne({ id }, { relations });
  }

  @Patch('/menuitems/:id/')
  @OpenAPI({
    summary: 'Update the fields of a menu item associated with id',
  })
  @ResponseSchema(MenuItem)
  public async patch(@Param('id') id: string, @Body() menuitem: object) {
    await MenuItem.update(id, menuitem);
    return MenuItem.findOne({ id }, { relations });
  }

  @Delete('/menuitems/:id/')
  @OnUndefined(204)
  @OpenAPI({
    summary: 'Delete a menu item associated with given id',
  })
  public async remove(@Param('id') id: string) {
    return MenuItem.delete({ id });
  }
}
