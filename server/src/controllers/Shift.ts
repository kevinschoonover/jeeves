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

import { Shift } from '../entity/Shift';

@JsonController()
export class ShiftController {
  @Get('/shifts/')
  public async getAll() {
    return Shift.find();
  }

  @Post('/shifts/')
  public save(@EntityFromBody() shift: Shift) {
    return shift.save();
  }

  @Get('/shifts/:id/')
  public async get(@Param('id') id: string) {
    return Shift.findOne({ id });
  }

  @Patch('/shifts/:id/')
  public async patch(@Param('id') id: string, @Body() shift: object) {
    await Shift.update(id, shift);
    return Shift.findOne({ id });
  }

  @Delete('/shifts/:id/')
  @OnUndefined(204)
  public async remove(@Param('id') id: string) {
    return Shift.delete({ id });
  }
}
