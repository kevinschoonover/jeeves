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

import { Review } from '../entity/Review';

@JsonController()
export class ReviewController {
  @Get('/reviews/')
  @OpenAPI({
    summary: 'Returns all reviews created in the database',
  })
  @ResponseSchema(Review)
  public async getAll() {
    return Review.find();
  }

  @Post('/reviews/')
  @OpenAPI({
    summary: 'Create a review',
  })
  @ResponseSchema(Review, {
    contentType: 'application/json',
    description: 'A list of created reviews',
    statusCode: '201',
  })
  public save(@EntityFromBody() review: Review) {
    return review.save();
  }

  @Get('/reviews/:id/')
  @OpenAPI({
    summary: 'Return the review associated with id',
  })
  @ResponseSchema(Review)
  public async get(@Param('id') id: string) {
    return Review.findOne({ id });
  }

  @Patch('/reviews/:id/')
  @OpenAPI({
    summary: 'Update the fields of a review associated with id',
  })
  @ResponseSchema(Review)
  public async patch(@Param('id') id: string, @Body() review: object) {
    await Review.update(id, review);
    return Review.findOne({ id });
  }

  @Delete('/reviews/:id/')
  @OnUndefined(204)
  @OpenAPI({
    summary: 'Delete a review associated with given id',
  })
  public async remove(@Param('id') id: string) {
    return Review.delete({ id });
  }
}
