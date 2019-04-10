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

const relations = ["menuItems"];

@JsonController()
export class OrderController {
  @Get('/orders/')
  public async getAll() {
    return Order.find({ relations });
  }

  @Post('/orders/')
  public async save(@EntityFromBody() order: Order) {
    return order.save();
  }

  @Get('/orders/:id/')
  public async get(@Param('id') id: number) {
    return Order.findOne({ id }, { relations });
  }

  @Patch('/orders/:id/')
  public async patch(@Param('id') id: number, @Body() order: object) {
    await Order.update(id, order);
    return Order.findOne({ id }, { relations });
  }

  @Delete('/orders/:id/')
  @OnUndefined(204)
  public async remove(@Param('id') id: number) {
    return Order.delete({ id });
  }
}
