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

import { Transaction } from '../entity/Transaction';

@JsonController()
export class TransactionController {
  @Get('/transactions/')
  public async getAll() {
    return Transaction.find();
  }

  @Post('/transactions/')
  public save(@EntityFromBody() transaction: Transaction) {
    return transaction.save();
  }

  @Get('/transactions/:id/')
  public async get(@Param('id') id: string) {
    return Transaction.findOne({ id });
  }

  @Patch('/transactions/:id/')
  public async patch(@Param('id') id: string, @Body() transaction: object) {
    await Transaction.update(id, transaction);
    return Transaction.findOne({ id });
  }

  @Delete('/transactions/:id/')
  @OnUndefined(204)
  public async remove(@Param('id') id: string) {
    return Transaction.delete({ id });
  }
}
