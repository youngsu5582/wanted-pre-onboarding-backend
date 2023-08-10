import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Ok, Result } from 'oxide.ts';
import { JwtProvider } from '@src/providers/jwt.provider';
import { ReadPostsQuery } from './read-posts-query';
import { POST_REPOSITORY } from '../../post.di-token';
import PostRepositoryPort from '../../database/post.repository.port';
import { Paginated } from '@src/libs/ddd/repository.port';
import { ReadPostProps } from '../../domain/post.types';

@QueryHandler(ReadPostsQuery)
export class ReadPostsQueryHandler implements IQueryHandler {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostRepositoryPort,
    private readonly jwtProvider: JwtProvider,
  ) {}
  async execute(query: ReadPostsQuery): Promise<Result<Paginated<ReadPostProps>,Error>> {
    try {
      const record = await this.postRepository.readPosts({ ...query });
      return Ok(record);
    } catch (err) {
      throw err;
    }
  }
}
