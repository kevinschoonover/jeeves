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

import { Account } from '../entity/Account';
import * as Auth from '../lib/auth';

@JsonController()
export class AccountController {
  @Get('/accounts/')
  public async getAll() {
    return Account.find();
  }

  @Post('/accounts/')
  public save(@EntityFromBody() account: Account) {
    return account.save();
  }

  @Get('/accounts/:id/')
  public async get(@Param('id') id: string) {
    return Account.findOne({ id });
  }

  @Patch('/accounts/:id/')
  public async patch(@Param('id') id: string, @Body() account: object) {
    await Account.update(id, account);
    return Account.findOne({ id });
  }

  @Delete('/accounts/:id/')
  @OnUndefined(204)
  public async remove(@Param('id') id: string) {
    return Account.delete({ id });
  }
}
