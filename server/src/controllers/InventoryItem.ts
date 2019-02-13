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
import { EntityFromBody } from 'typeorm-routing-controllers-extensions';

import { InventoryItem } from '../entity/InventoryItem';

@JsonController()
export class InventoryItemController {
  @Get('/inventoryitems/')
  public async getAll() {
    console.log('hello');
    return InventoryItem.find();
  }

  @Post('/inventoryitems/')
  public async save(@EntityFromBody() inventoryitems: InventoryItem) {
    return inventoryitems.save();
  }

  @Get('/inventoryitems/:id/')
  public async get(@Param('id') id: string) {
    return InventoryItem.findOne({ id });
  }

  @Patch('/inventoryitems/:id/')
  public async patch(@Param('id') id: string, @Body() inventoryitems: object) {
    await InventoryItem.update(id, inventoryitems);
    return InventoryItem.findOne({ id });
  }

  @Delete('/inventoryitems/:id/')
  @OnUndefined(204)
  public async remove(@Param('id') id: string) {
    return InventoryItem.delete({ id });
  }
}
