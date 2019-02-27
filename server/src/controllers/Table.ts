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

import { Table } from '../entity/Table';

@JsonController()
export class TableController {
  @Get('/tables/')
  @OpenAPI({
    summary: 'Returns all tables created in the database',
  })
  @ResponseSchema(Table)
  public async getAll() {
    return Table.find();
  }

  @Post('/tables/')
  @OpenAPI({
    summary: 'Create a table',
  })
  @ResponseSchema(Table, {
    contentType: 'application/json',
    description: 'A list of created tables',
    statusCode: '201',
  })
  public save(@EntityFromBody() table: Table) {
    return table.save();
  }

  @Get('/tables/:id/')
  @OpenAPI({
    summary: 'Return the table associated with id',
  })
  @ResponseSchema(Table)
  public async get(@Param('id') id: number) {
    return Table.findOne({ id });
  }

  @Patch('/tables/:id/')
  @OpenAPI({
    summary: 'Update the fields of a table associated with id',
  })
  @ResponseSchema(Table)
  public async patch(@Param('id') id: number, @Body() table: object) {
    await Table.update(id, table);
    return Table.findOne({ id });
  }

  @Delete('/tables/:id/')
  @OnUndefined(204)
  @OpenAPI({
    summary: 'Delete a table associated with given id',
  })
  public async remove(@Param('id') id: number) {
    return Table.delete({ id });
  }
}
