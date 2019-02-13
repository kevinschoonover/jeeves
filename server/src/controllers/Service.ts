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
  @Get('/service/')
  public async getAll() {
    return Service.find();
  }

  @Post('/service/')
  public save(@EntityFromBody() service: Service) {
    return service.save();
  }

  @Get('/service/:id/')
  public async get(@Param('id') id: string) {
    return Service.findOne({ id });
  }

  @Patch('/service/:id/')
  public async patch(@Param('id') id: string, @Body() service: object) {
    await Service.update(id, service);
    return Service.findOne({ id });
  }

  @Delete('/service/:id/')
  @OnUndefined(204)
  public async remove(@Param('id') id: string) {
    return Service.delete({ id });
  }
}
