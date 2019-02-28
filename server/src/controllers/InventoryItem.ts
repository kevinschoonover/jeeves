import {
  Body,
  Delete,
  Get,
  JsonController,
  OnUndefined,
  Param,
  Patch,
  Post,
  UnauthorizedError,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import { EntityFromBody } from 'typeorm-routing-controllers-extensions';

import { InventoryItem } from '../entity/InventoryItem';

@JsonController()
export class InventoryItemController {
  @Get('/inventoryitems/')
  @OpenAPI({
    summary: 'Returns all Inventory Items created in the database',
  })
  public async getAll() {
    return InventoryItem.find();
  }

  @Post('/inventoryitems/')
  @OpenAPI({
    summary: 'Create an inventory item',
  })
  @ResponseSchema(InventoryItem, {
    contentType: 'application/json',
    description: 'A list of created inventory items',
    statusCode: '201',
  })
  public async save(@EntityFromBody() inventoryitems: InventoryItem) {
    return inventoryitems.save();
  }

  @Get('/inventoryitems/:name/')
  @OpenAPI({
    summary: 'Return the inventory item associated with name',
  })
  public async get(@Param('name') name: string) {
    return InventoryItem.findOne({ name });
  }

  @Patch('/inventoryitems/:name/')
  @OpenAPI({
    summary: 'Update the fields of an inventory item associated with name',
  })
  public async patch(
    @Param('name') name: string,
    @Body() inventoryitems: object
  ) {
    await InventoryItem.update(name, inventoryitems);
    return InventoryItem.findOne({ name });
  }

  @Delete('/inventoryitems/:name/')
  @OnUndefined(204)
  public async remove(@Param('name') name: string) {
    return InventoryItem.delete({ name });
  }
}
