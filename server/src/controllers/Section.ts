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

import { Section } from '../entity/Section';

@JsonController()
export class SectionController {
  @Get('/sections/')
  @OpenAPI({
    summary: 'Returns all sections created in the database',
  })
  public async getAll() {
    return Section.find();
  }

  @Post('/sections/')
  @OpenAPI({
    summary: 'Create a section',
  })
  @ResponseSchema(Section, {
    contentType: 'application/json',
    description: 'A list of created sections',
    statusCode: '201',
  })
  public save(@EntityFromBody() section: Section) {
    return section.save();
  }

  @Get('/sections/:id/')
  @OpenAPI({
    summary: 'Return the section associated with id',
  })
  public async get(@Param('id') id: number) {
    return Section.findOne({ id });
  }

  @Patch('/sections/:id/')
  @OpenAPI({
    summary: 'Update the fields of a section associated with id',
  })
  public async patch(@Param('id') id: number, @Body() section: object) {
    await Section.update(id, section);
    return Section.findOne({ id });
  }

  @Delete('/sections/:id/')
  @OnUndefined(204)
  @OpenAPI({
    summary: 'Delete a section associated with given id',
  })
  public async remove(@Param('id') id: number) {
    return Section.delete({ id });
  }
}
