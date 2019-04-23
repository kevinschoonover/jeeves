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

import { Menu } from '../entity/Menu';

const relations = ['menuItems'];

@JsonController()
export class MenuController {
  @Get('/menus/')
  @OpenAPI({
    summary: 'Returns all menus created in the database',
  })
  @ResponseSchema(Menu)
  public async getAll() {
    return Menu.find({ relations });
  }

  @Post('/menus/')
  @OpenAPI({
    summary: 'Create a menu',
  })
  @ResponseSchema(Menu, {
    contentType: 'application/json',
    description: 'A list of created menus',
    statusCode: '201',
  })
  public async save(@EntityFromBody() menu: Menu) {
    return menu.save();
  }

  @Get('/menus/:name/')
  @OpenAPI({
    summary: 'Return the menu associated with name',
  })
  @ResponseSchema(Menu)
  public async get(@Param('name') name: string) {
    return Menu.findOne({ name }, { relations });
  }

  @Patch('/menus/:name/')
  @OpenAPI({
    summary: 'Update the fields of a menu associated with name',
  })
  @ResponseSchema(Menu)
  public async patch(@Param('name') name: string, @Body() menu: object) {
    await Menu.update(name, menu);
    return Menu.findOne({ name }, { relations });
  }

  @Delete('/menus/:name/')
  @OnUndefined(204)
  @OpenAPI({
    summary: 'Delete a menu associated with given name',
  })
  public async remove(@Param('name') name: string) {
    return Menu.delete({ name });
  }
}
