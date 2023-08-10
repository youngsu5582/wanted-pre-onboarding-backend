import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';
import { DBInsertError } from '@src/modules/common.errors';
import { CreatePostCommand } from './create-post-command';
import { POST_REPOSITORY } from '../../post.di-token';
import PostRepositoryPort from '../../database/post.repository.port';
import { PostEntity } from '../../domain/post.entity';

@CommandHandler(CreatePostCommand)
export class CreatePostCommandHandler implements ICommandHandler {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostRepositoryPort,
  ) {}
  async execute(command: CreatePostCommand): Promise<Result<string, Error>> {
    const { content, title, userId } = command;
    const post = PostEntity.create({ title, content, userId });
    try {
      await this.postRepository.createPost(post);
      return Ok(post.id);
    } catch (error: any) {
      throw Err(new DBInsertError(error));
    }
  }
}
