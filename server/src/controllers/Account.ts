import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

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
} from 'routing-controllers';
import { EntityFromBody } from 'typeorm-routing-controllers-extensions';

import { Account } from '../entity/Account';
import * as Auth from '../lib/auth';

@JsonController()
export class AccountController {
  @Get('/accounts/')
  @OpenAPI({
    summary: 'Return a list of accounts',
    description: 'List all accounts',
  })
  public async getAll() {
    return Account.find();
  }

  @Post('/accounts/')
  @OpenAPI({
    summary: 'Add one account',
    description: 'Add an account to the Account table',
  })
  @ResponseSchema(Account, {
    contentType: 'text/csv',
    description: 'A list of created account objects',
    statusCode: '201',
  })
  public save(@EntityFromBody() account: Account) {
    return account.save();
  }

  @Get('/accounts/:id/')
  @OpenAPI({
    summary: 'Return a single account with given ID',
    description: 'List the account with given account ID',
  })
  public async get(@Param('id') id: string) {
    return Account.findOne({ id });
  }

  @Patch('/accounts/:id/')
  @OpenAPI({
    summary: 'Update an account with given ID',
    description: 'Update an account with given ID with given account object',
  })
  public async patch(@Param('id') id: string, @Body() account: object) {
    await Account.update(id, account);
    return Account.findOne({ id });
  }

  @Delete('/accounts/:id/')
  @OnUndefined(204)
  @OpenAPI({
    summary: 'Delete an account with given ID',
    description: 'Delete an account with given ID',
  })
  public async remove(@Param('id') id: string) {
    return Account.delete({ id });
  }
}

const storage = getMetadataArgsStorage();
const spec = routingControllersToSpec(storage);
console.log(JSON.stringify(spec, null, 2));
