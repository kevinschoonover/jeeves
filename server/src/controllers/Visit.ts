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

import { Visit } from '../entity/Visit';

@JsonController()
export class VisitController {
  @Get('/visits/')
  @OpenAPI({
    summary: 'Returns all visits created in the database',
  })
  public async getAll() {
    return Visit.find();
  }

  @Post('/visits/')
  @OpenAPI({
    summary: 'Create a visit',
  })
  @ResponseSchema(Visit, {
    contentType: 'application/json',
    description: 'A list of created visits',
    statusCode: '201',
  })
  public save(@EntityFromBody() visit: Visit) {
    return visit.save();
  }

  @Get('/visits/:id/')
  @OpenAPI({
    summary: 'Return the visit associated with id',
  })
  public async get(@Param('id') id: number) {
    return Visit.findOne({ id });
  }

  @Patch('/visits/:id/')
  @OpenAPI({
    summary: 'Update the fields of a visit associated with id',
  })
  public async patch(@Param('id') id: number, @Body() visit: object) {
    await Visit.update(id, visit);
    return Visit.findOne({ id });
  }

  @Delete('/visits/:id/')
  @OnUndefined(204)
  @OpenAPI({
    summary: 'Delete a visit associated with given id',
  })
  public async remove(@Param('id') id: number) {
    return Visit.delete({ id });
  }
}
