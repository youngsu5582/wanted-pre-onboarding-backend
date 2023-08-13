import { TypedQuery, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ReadPostsQuery } from './read-posts-query';
import { Result } from 'oxide.ts';
import { Paginated } from '@src/libs/ddd/repository.port';
import { PostsResult } from '../../domain/post.types';
class PostPaginationDto {
  /**
   * @minimum 0
   */
  page?: number;
  /**
   * @minimum 0
   */
  limit?: number;
  order?: 'desc' | 'asc';
}

@Controller('post')
export class ReadPostsController {
  constructor(private readonly queryBus: QueryBus) {}
  /**
   * 게시글 목록 조회 기능
   *
   * Query 를 통해 받은 Pagination Option 을 통해 , 조건에 맞는 Post id[] 를 받는다.
   *
   * @tag post
   * @param queryParams
   * @returns
   */
  @TypedRoute.Get('/')
  async reads(
    @TypedQuery() queryParams: PostPaginationDto,
  ): Promise<Paginated<PostsResult>> {
    const query = new ReadPostsQuery({
      page: queryParams.page,
      limit: queryParams.limit,
      orderBy: {
        field: true,
        param: queryParams.order ? queryParams.order : 'desc',
      },
    });

    const result: Result<
      Paginated<PostsResult>,
      Error
    > = await this.queryBus.execute(query);
    const paginated = result.unwrap();
    return {
      ...paginated,
    };
  }
}
