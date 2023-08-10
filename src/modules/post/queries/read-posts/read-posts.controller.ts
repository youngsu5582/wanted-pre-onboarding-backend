import { TypedQuery, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ReadPostsQuery } from './read-posts-query';
import { PostPaginationDto } from '@src/libs/api/post-pagination.dto';
import { Result } from 'oxide.ts';
import { Paginated } from '@src/libs/ddd/repository.port';
import { ReadPostProps } from '../../domain/post.types';

@Controller('post')
export class ReadPostsController {
  constructor(private readonly queryBus: QueryBus) {}
  @TypedRoute.Get('')
  async read(
    @TypedQuery() queryParams: PostPaginationDto,
  ): Promise<Paginated<ReadPostProps>> {
    const query = new ReadPostsQuery({
      page: queryParams.page,
      limit: queryParams.limit,
      orderBy: {
        field: true,
        param: queryParams.order ? queryParams.order : 'desc',
      },
    });
    const result: Result<
      Paginated<ReadPostProps>,
      Error
    > = await this.queryBus.execute(query);
    const paginated = result.unwrap();
    return {
      ...paginated,
    };
  }
}
