import { TypedRoute } from '@nestia/core';
import { Controller, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Result, match } from 'oxide.ts';
import { UserId } from '@src/decorators/user-id.decorator';
import { AccessTokenGuard } from '@src/providers/guards/accessToken.guard';
import { PostId } from '@src/decorators/post-id.decorator';
import { PostNotMatchedUser } from '../../post.errors';
import { DeletePostCommand } from './delete-post-command';

@Controller('post')
export class DeletePostController {
  constructor(private readonly commandBus: CommandBus) {}
  /**
   * 게시글 삭제 기능
   *
   * postId 를 통해 특정 게시물을 삭제한다.
   *
   * @tag post
   * @param userId
   * @param postId
   * @returns
   */
  @UseGuards(AccessTokenGuard)
  @TypedRoute.Delete('/:postId')
  async update(
    @UserId() userId: string,
    @PostId() postId: string,
  ): Promise<string> {
    const command = new DeletePostCommand({
      userId,
      postId,
    });
    const result: Result<string, PostNotMatchedUser> =
      await this.commandBus.execute(command);
    return match(result, {
      Ok: (id: string) => id,
      Err: (error: PostNotMatchedUser) => {
        throw error;
      },
    });
  }
}
