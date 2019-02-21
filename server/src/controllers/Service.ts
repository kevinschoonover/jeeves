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

import { Service } from '../entity/Service';

@JsonController()
export class ServiceController {
  @Get('/services/')
  public async getAll() {
    return Service.find();
  }

  @Post('/services/')
  public save(@EntityFromBody() service: Service) {
    return service.save();
  }

  @Get('/services/:id/')
  public async get(@Param('id') id: number) {
    return Service.findOne({ id });
  }

  @Patch('/services/:id/')
  public async patch(@Param('id') id: number, @Body() service: object) {
    await Service.update(id, service);
    return Service.findOne({ id });
  }

  @Delete('/services/:id/')
  @OnUndefined(204)
  public async remove(@Param('id') id: number) {
    return Service.delete({ id });
  }
}
