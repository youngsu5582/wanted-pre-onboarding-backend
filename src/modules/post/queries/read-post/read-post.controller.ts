import { TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Result } from 'oxide.ts';
import { PostProps } from '../../domain/post.types';
import { ReadPostQuery } from './read-post-query';
import { PostId } from '@src/decorators/post-id.decorator';

@Controller('post')
export class ReadPostController {
  constructor(private readonly queryBus: QueryBus) {}
  @TypedRoute.Get('/:postId')
  async read(@PostId() postId: string) {
    const query = new ReadPostQuery({ id: postId });
    const result: Result<PostProps, Error> = await this.queryBus.execute(query);
    const paginated = result.unwrap();
    return {
      ...paginated,
    };
  }
}
