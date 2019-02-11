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

import { Restaurant } from '../entity/Restaurant';

@JsonController()
export class RestaurantController {
  @Get('/restaurants/')
  public async getAll() {
    return Restaurant.find();
  }

  @Post('/restaurants/')
  public save(@EntityFromBody() restaurant: Restaurant) {
    return restaurant.save();
  }

  @Get('/restaurants/:id/')
  public async get(@Param('id') id: string) {
    return Restaurant.findOne({ id });
  }

  @Patch('/restaurants/:id/')
  public async patch(@Param('id') id: string, @Body() restaurant: object) {
    await Restaurant.update(id, restaurant);
    return Restaurant.findOne({ id });
  }

  @Delete('/restaurants/:id/')
  @OnUndefined(204)
  public async remove(@Param('id') id: string) {
    return Restaurant.delete({ id });
  }
}
