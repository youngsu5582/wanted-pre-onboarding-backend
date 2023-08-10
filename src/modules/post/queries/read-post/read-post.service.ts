import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { JwtProvider } from '@src/providers/jwt.provider';
import { POST_REPOSITORY } from '../../post.di-token';
import PostRepositoryPort from '../../database/post.repository.port';
import { ReadPostQuery } from './read-post-query';
import { PostNotExistsError } from '../../post.errors';
import { PostProps } from '../../domain/post.types';

@QueryHandler(ReadPostQuery)
export class ReadPostQueryHandler implements IQueryHandler {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostRepositoryPort,
    private readonly jwtProvider: JwtProvider,
  ) {}
  async execute(query: ReadPostQuery): Promise<Result<PostProps,Error>> {
    try {
      const record = await this.postRepository.readPost(query.postId);
      if(!record) return Err(new PostNotExistsError())
      return Ok(record);
    } catch (err) {
      throw err;
    }
  }
}
