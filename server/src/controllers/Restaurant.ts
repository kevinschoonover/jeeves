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
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import { Restaurant } from '../entity/Restaurant';

@JsonController()
export class RestaurantController {
  @Get('/restaurants/')
  @OpenAPI({
    summary: 'Returns all restaurants created in the database',
  })
  @ResponseSchema(Restaurant)
  public async getAll() {
    return Restaurant.find();
  }

  @Post('/restaurants/')
  @OpenAPI({
    summary: 'Create a restaurant',
  })
  @ResponseSchema(Restaurant, {
    contentType: 'application/json',
    description: 'A list of created restaurants',
    statusCode: '201',
  })
  public save(@EntityFromBody() restaurant: Restaurant) {
    return restaurant.save();
  }

  @Get('/restaurants/:id/')
  @OpenAPI({
    summary: 'Return the restaurant associated with id',
  })
  @ResponseSchema(Restaurant)
  public async get(@Param('id') id: string) {
    return Restaurant.findOne({ id });
  }

  @Patch('/restaurants/:id/')
  @OpenAPI({
    summary: 'Update the fields of a restaurant associated with id',
  })
  @ResponseSchema(Restaurant)
  public async patch(@Param('id') id: string, @Body() restaurant: object) {
    await Restaurant.update(id, restaurant);
    return Restaurant.findOne({ id });
  }

  @Delete('/restaurants/:id/')
  @OnUndefined(204)
  @OpenAPI({
    summary: 'Delete a restaurant associated with given id',
  })
  public async remove(@Param('id') id: string) {
    return Restaurant.delete({ id });
  }
}
