import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Ok } from 'oxide.ts';
import { JwtProvider } from '@src/providers/jwt.provider';
import { POST_REPOSITORY } from '../../post.di-token';
import PostRepositoryPort from '../../database/post.repository.port';
import { ReadPostQuery } from './read-post-query';

@QueryHandler(ReadPostQuery)
export class ReadPostQueryHandler implements IQueryHandler {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostRepositoryPort,
    private readonly jwtProvider: JwtProvider,
  ) {}
  async execute(query: ReadPostQuery): Promise<any> {
    try {
      const record = await this.postRepository.readPost(query.postId);
      return Ok(record);
    } catch (err) {
      throw err;
    }
  }
}
