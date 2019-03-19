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

import { Transaction } from '../entity/Transaction';

@JsonController()
export class TransactionController {
  @Get('/transactions/')
  @OpenAPI({
    summary: 'Returns all transactions created in the database',
  })
  @ResponseSchema(Transaction)
  public async getAll() {
    return Transaction.find();
  }

  @Post('/transactions/')
  @OpenAPI({
    summary: 'Create a transaction',
  })
  @ResponseSchema(Transaction, {
    contentType: 'application/json',
    description: 'A list of created transactions',
    statusCode: '201',
  })
  public save(@EntityFromBody() transaction: Transaction) {
    return transaction.save();
  }

  @Get('/transactions/:id/')
  @OpenAPI({
    summary: 'Return the transaction associated with id',
  })
  @ResponseSchema(Transaction)
  public async get(@Param('id') id: number) {
    return Transaction.findOne({ id });
  }

  @Patch('/transactions/:id/')
  @OpenAPI({
    summary: 'Update the fields of a transaction associated with id',
  })
  @ResponseSchema(Transaction)
  public async patch(@Param('id') id: number, @Body() transaction: object) {
    await Transaction.update(id, transaction);
    return Transaction.findOne({ id });
  }

  @Delete('/transactions/:id/')
  @OnUndefined(204)
  @OpenAPI({
    summary: 'Delete a transaction associated with given id',
  })
  public async remove(@Param('id') id: number) {
    return Transaction.delete({ id });
  }
}
