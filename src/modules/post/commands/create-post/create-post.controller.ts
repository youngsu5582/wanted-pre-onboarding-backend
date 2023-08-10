import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Result, match } from 'oxide.ts';
import { CreatePostProps } from '../../domain/post.types';
import { CreatePostCommand } from './create-post-command';
import { UserId } from '@src/decorators/user-id.decorator';
import { AccessTokenGuard } from '@src/providers/guards/accessToken.guard';

@Controller('post')
export class CreatePostController {
  constructor(private readonly commandBus: CommandBus) {}
  /**
   * 게시글 작성 기능
   *
   * Body 를 통해 받은 createPostProps( title , content )를 통해 Post를 만든다.
   *
   * @tag post
   * @param createPostProps
   * @param userId
   * @returns
   */
  @UseGuards(AccessTokenGuard)
  @TypedRoute.Post('create')
  async create(
    @TypedBody() createPostProps: CreatePostProps,
    @UserId() userId: string,
  ): Promise<string> {
    const command = new CreatePostCommand({ ...createPostProps, userId });
    const result: Result<string, undefined> = await this.commandBus.execute(
      command,
    );
    return match(result, {
      Ok: (id: string) => id,
    });
  }
}
