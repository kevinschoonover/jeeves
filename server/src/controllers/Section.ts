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

import { Section } from '../entity/Section';

@JsonController()
export class SectionController {
  @Get('/sections/')
  public async getAll() {
    return Section.find();
  }

  @Post('/sections/')
  public save(@EntityFromBody() section: Section) {
    return section.save();
  }

  @Get('/sections/:id/')
  public async get(@Param('id') id: number) {
    return Section.findOne({ id });
  }

  @Patch('/sections/:id/')
  public async patch(@Param('id') id: number, @Body() section: object) {
    await Section.update(id, section);
    return Section.findOne({ id });
  }

  @Delete('/sections/:id/')
  @OnUndefined(204)
  public async remove(@Param('id') id: number) {
    return Section.delete({ id });
  }
}
