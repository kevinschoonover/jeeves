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

import { Table } from '../entity/Table';

@JsonController()
export class TableController {
  @Get('/tables/')
  public async getAll() {
    return Table.find();
  }

  @Post('/tables/')
  public save(@EntityFromBody() table: Table) {
    return table.save();
  }

  @Get('/tables/:id/')
  public async get(@Param('id') id: number) {
    return Table.findOne({ id });
  }

  @Patch('/tables/:id/')
  public async patch(@Param('id') id: number, @Body() table: object) {
    await Table.update(id, table);
    return Table.findOne({ id });
  }

  @Delete('/tables/:id/')
  @OnUndefined(204)
  public async remove(@Param('id') id: number) {
    return Table.delete({ id });
  }
}
