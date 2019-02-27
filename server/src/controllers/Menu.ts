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
import { EntityFromBody } from 'typeorm-routing-controllers-extensions';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import { Menu } from '../entity/Menu';

@JsonController()
export class MenuController {
  @Get('/menus/')
  @OpenAPI({
    summary: 'Returns all menus created in the database',
  })
  @ResponseSchema(Menu)
  public async getAll() {
    return Menu.find();
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

  @Get('/menus/:id/')
  @OpenAPI({
    summary: 'Return the menu associated with id',
  })
  @ResponseSchema(Menu)
  public async get(@Param('id') id: string) {
    return Menu.findOne({ id });
  }

  @Patch('/menus/:id/')
  @OpenAPI({
    summary: 'Update the fields of a menu associated with id',
  })
  @ResponseSchema(Menu)
  public async patch(@Param('id') id: string, @Body() menu: object) {
    await Menu.update(id, menu);
    return Menu.findOne({ id });
  }

  @Delete('/menus/:id/')
  @OnUndefined(204)
  @OpenAPI({
    summary: 'Delete a menu associated with given id',
  })
  public async remove(@Param('id') id: string) {
    return Menu.delete({ id });
  }
}
