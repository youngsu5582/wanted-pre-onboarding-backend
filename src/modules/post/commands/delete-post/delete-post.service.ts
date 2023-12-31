import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';
import { DBDeleteError } from '@src/modules/common.errors';
import { POST_REPOSITORY } from '../../post.di-token';
import PostRepositoryPort from '../../database/post.repository.port';
import { PostEntity } from '../../domain/post.entity';
import { PostNotMatchedUser } from '../../post.errors';
import { UpdatePostCommand } from '../update-post/update-post-command';
import { DeletePostCommand } from './delete-post-command';

@CommandHandler(DeletePostCommand)
export class DeletePostCommandHandler implements ICommandHandler {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostRepositoryPort,
  ) {}
  async execute(command: UpdatePostCommand): Promise<Result<string, Error>> {
    const { content, title, userId, postId, imageUrl } = command;
    const post = PostEntity.update(postId, {
      title,
      content,
      userId,
      imageUrl,
    });
    try {
      const isMatched = await this.postRepository.matchAuthorAndUser(
        postId,
        userId,
      );
      if (!isMatched) return Err(new PostNotMatchedUser());
      await this.postRepository.deletePost(postId);
      return Ok(post.id);
    } catch (error: any) {
      throw Err(new DBDeleteError(error));
    }
  }
}
