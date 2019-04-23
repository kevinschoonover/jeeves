import {
  Body,
  CurrentUser,
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

import { Order } from '../entity/Order';

@JsonController()
export class OrderController {
  @Get('/orders/')
  public async getAll() {
    return Order.find({ relations: ['visit', 'menuItems'] });
  }

  @Post('/orders/')
  public async save(@EntityFromBody() order: Order) {
    return order.save();
  }

  @Get('/orders/:id/')
  public async get(@Param('id') id: string) {
    return Order.findOne({ id }, { relations: ['visit', 'menuItems'] });
  }

  @Patch('/orders/:id/')
  public async patch(@Param('id') id: string, @Body() order: object) {
    await Order.update(id, order);
    return Order.findOne({ id }, { relations: ['visit', 'menuItems'] });
  }

  @Delete('/orders/:id/')
  @OnUndefined(204)
  public async remove(@Param('id') id: string) {
    return Order.delete({ id });
  }
}
