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

import { Visit } from '../entity/Visit';

@JsonController()
export class VisitController {
  @Get('/visits/')
  public async getAll() {
    return Visit.find();
  }

  @Post('/visits/')
  public save(@EntityFromBody() visit: Visit) {
    return visit.save();
  }

  @Get('/visits/:id/')
  public async get(@Param('id') id: string) {
    return Visit.findOne({ id });
  }

  @Patch('/visits/:id/')
  public async patch(@Param('id') id: string, @Body() visit: object) {
    await Visit.update(id, visit);
    return Visit.findOne({ id });
  }

  @Delete('/visits/:id/')
  @OnUndefined(204)
  public async remove(@Param('id') id: string) {
    return Visit.delete({ id });
  }
}
