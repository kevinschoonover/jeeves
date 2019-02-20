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

import { Review } from '../entity/Review';

@JsonController()
export class ReviewController {
  @Get('/reviews/')
  public async getAll() {
    return Review.find();
  }

  @Post('/reviews/')
  public save(@EntityFromBody() review: Review) {
    return review.save();
  }

  @Get('/reviews/:id/')
  public async get(@Param('id') id: number) {
    return Review.findOne({ id });
  }

  @Patch('/reviews/:id/')
  public async patch(@Param('id') id: number, @Body() review: object) {
    await Review.update(id, review);
    return Review.findOne({ id });
  }

  @Delete('/reviews/:id/')
  @OnUndefined(204)
  public async remove(@Param('id') id: number) {
    return Review.delete({ id });
  }
}
