import {
  Body,
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

import { Reservation } from '../entity/Reservation';

@JsonController()
export class ReservationController {
  @Get('/reservations/')
  public async getAll() {
    return Reservation.find();
  }

  @Post('/reservations/')
  public async save(@EntityFromBody() reservations: Reservation) {
    return reservations.save();
  }

  @Get('/reservations/:id/')
  public async get(@Param('id') id: string) {
    return Reservation.findOne({ id });
  }

  @Patch('/reservations/:id/')
  public async patch(@Param('id') id: string, @Body() reservations: object) {
    await Reservation.update(id, reservations);
    return Reservation.findOne({ id });
  }

  @Delete('/reservations/:id/')
  @OnUndefined(204)
  public async remove(@Param('id') id: string) {
    return Reservation.delete({ id });
  }
}
