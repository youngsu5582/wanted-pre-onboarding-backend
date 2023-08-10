import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';
import { DBInsertError } from '@src/modules/common.errors';
import { POST_REPOSITORY } from '../../post.di-token';
import PostRepositoryPort from '../../database/post.repository.port';
import { PostEntity } from '../../domain/post.entity';
import { UpdatePostCommand } from './update-post-command';
import { PostNotMatchedUser } from '../../post.errors';

@CommandHandler(UpdatePostCommand)
export class UpdatePostCommandHandler implements ICommandHandler {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostRepositoryPort,
  ) {}
  async execute(command: UpdatePostCommand): Promise<Result<string, Error>> {
    const { content, title, userId, postId } = command;
    const post = PostEntity.update(postId, { title, content, userId });
    try {
      const isMatched = this.postRepository.matchAuthorAndUser(postId, userId);
      if (!isMatched) return Err(new PostNotMatchedUser());
      await this.postRepository.updatePost(postId, post);
      return Ok(post.id);
    } catch (error: any) {
      throw Err(new DBInsertError(error));
    }
  }
}
