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

import { Reservation } from '../entity/Reservation';

@JsonController()
export class ReservationController {
  @Get('/reservations/')
  @OpenAPI({
    summary: 'Returns all reservations created in the database',
  })
  public async getAll() {
    return Reservation.find();
  }

  @Post('/reservations/')
  @OpenAPI({
    summary: 'Create a reservation',
  })
  @ResponseSchema(Reservation, {
    contentType: 'application/json',
    description: 'A list of created reservations',
    statusCode: '201',
  })
  public async save(@EntityFromBody() reservations: Reservation) {
    return reservations.save();
  }

  @Get('/reservations/:id/')
  @OpenAPI({
    summary: 'Return the reservation associated with id',
  })
  public async get(@Param('id') id: string) {
    return Reservation.findOne({ id });
  }

  @Patch('/reservations/:id/')
  @OpenAPI({
    summary: 'Update the fields of a reservation associated with id',
  })
  public async patch(@Param('id') id: string, @Body() reservations: object) {
    await Reservation.update(id, reservations);
    return Reservation.findOne({ id });
  }

  @Delete('/reservations/:id/')
  @OnUndefined(204)
  @OpenAPI({
    summary: 'Delete a reservation associated with given id',
  })
  public async remove(@Param('id') id: string) {
    return Reservation.delete({ id });
  }
}
