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

import { Service } from '../entity/Service';

@JsonController()
export class ServiceController {
  @Get('/services/')
  @OpenAPI({
    summary: 'Returns all services created in the database',
  })
  @ResponseSchema(Service)
  public async getAll() {
    return Service.find();
  }

  @Post('/services/')
  @OpenAPI({
    summary: 'Create a service',
  })
  @ResponseSchema(Service, {
    contentType: 'application/json',
    description: 'A list of created services',
    statusCode: '201',
  })
  public save(@EntityFromBody() service: Service) {
    return service.save();
  }

  @Get('/services/:id/')
  @OpenAPI({
    summary: 'Return the service associated with id',
  })
  @ResponseSchema(Service)
  public async get(@Param('id') id: number) {
    return Service.findOne({ id });
  }

  @Patch('/services/:id/')
  @OpenAPI({
    summary: 'Update the fields of a service associated with id',
  })
  @ResponseSchema(Service)
  public async patch(@Param('id') id: number, @Body() service: object) {
    await Service.update(id, service);
    return Service.findOne({ id });
  }

  @Delete('/services/:id/')
  @OnUndefined(204)
  @OpenAPI({
    summary: 'Delete a service associated with given id',
  })
  public async remove(@Param('id') id: number) {
    return Service.delete({ id });
  }
}
