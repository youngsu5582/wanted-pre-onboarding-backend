import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Result, match } from 'oxide.ts';
import { UpdatePostProps } from '../../domain/post.types';
import { UpdatePostCommand } from './update-post-command';
import { UserId } from '@src/decorators/user-id.decorator';
import { AccessTokenGuard } from '@src/providers/guards/accessToken.guard';
import { PostId } from '@src/decorators/post-id.decorator';
import { PostNotMatchedUser } from '../../post.errors';

@Controller('post')
export class UpdatePostController {
  constructor(private readonly commandBus: CommandBus) {}
  /**
   * 게시글 수정 기능
   *
   * Body 를 통해 받은 updatePostProps( title , content ) 를 통해 Post를 수정한다.
   *
   * @tag post
   * @param updatePostProps
   * @param userId
   * @param postId
   * @returns
   */
  @UseGuards(AccessTokenGuard)
  @TypedRoute.Put('/:postId')
  async update(
    @TypedBody() updatePostProps: UpdatePostProps,
    @UserId() userId: string,
    @PostId() postId: string,
  ): Promise<string> {
    const command = new UpdatePostCommand({
      ...updatePostProps,
      userId,
      postId,
    });
    const result: Result<string, PostNotMatchedUser> =
      await this.commandBus.execute(command);
    return match(result, {
      Ok: (id: string) => id,
      Err: (error: PostNotMatchedUser) => {
        console.log(error);
        throw error;
      },
    });
  }
}
