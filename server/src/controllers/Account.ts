import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

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

import { Account } from '../entity/Account';

@JsonController()
export class AccountController {
  @Get('/accounts/')
  @OpenAPI({
    summary: 'Returns all Accounts registered in the database',
  })
  @ResponseSchema(Account)
  public async getAll() {
    return Account.find();
  }

  @Post('/accounts/')
  @OpenAPI({
    summary: 'Create an account',
  })
  @ResponseSchema(Account, {
    contentType: 'application/json',
    description: 'A list of created Accounts',
    statusCode: '201',
  })
  public save(@EntityFromBody() account: Account) {
    return account.save();
  }

  @Get('/accounts/:id/')
  @OpenAPI({
    summary: 'Return the Account associated with id',
  })
  public async get(@Param('id') id: string) {
    return Account.findOne({ id });
  }

  @Patch('/accounts/:id/')
  @OpenAPI({
    summary: 'Update the fields of an Account associated with id',
  })
  public async patch(@Param('id') id: string, @Body() account: object) {
    await Account.update(id, account);
    return Account.findOne({ id });
  }

  @Delete('/accounts/:id/')
  @OnUndefined(204)
  @OpenAPI({
    summary: 'Delete an Account associated with id',
  })
  public async remove(@Param('id') id: string) {
    return Account.delete({ id });
  }
}
