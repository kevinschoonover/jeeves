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

import { Shift } from '../entity/Shift';

@JsonController()
export class ShiftController {
  @Get('/shifts/')
  @OpenAPI({
    summary: 'Returns all shifts created in the database',
  })
  @ResponseSchema(Shift)
  public async getAll() {
    return Shift.find();
  }

  @Post('/shifts/')
  @OpenAPI({
    summary: 'Create a shift',
  })
  @ResponseSchema(Shift, {
    contentType: 'application/json',
    description: 'A list of created shifts',
    statusCode: '201',
  })
  public save(@EntityFromBody() shift: Shift) {
    return shift.save();
  }

  @Get('/shifts/:id/')
  @OpenAPI({
    summary: 'Return the shift associated with id',
  })
  @ResponseSchema(Shift)
  public async get(@Param('id') id: number) {
    return Shift.findOne({ id });
  }

  @Patch('/shifts/:id/')
  @OpenAPI({
    summary: 'Update the fields of a shift associated with id',
  })
  @ResponseSchema(Shift)
  public async patch(@Param('id') id: number, @Body() shift: object) {
    await Shift.update(id, shift);
    return Shift.findOne({ id });
  }

  @Delete('/shifts/:id/')
  @OnUndefined(204)
  @OpenAPI({
    summary: 'Delete a shift associated with given id',
  })
  public async remove(@Param('id') id: number) {
    return Shift.delete({ id });
  }
}
