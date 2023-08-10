import { TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Result, match } from 'oxide.ts';
import { PostProps } from '../../domain/post.types';
import { ReadPostQuery } from './read-post-query';
import { PostId } from '@src/decorators/post-id.decorator';
import { PostNotExistsError } from '../../post.errors';
import { ResponseBase } from '@src/libs/api/response.base';

@Controller('post')
export class ReadPostController {
  constructor(private readonly queryBus: QueryBus) {}
  @TypedRoute.Get('/:postId')
  async read(@PostId() postId: string) : Promise<ResponseBase<PostProps>> {
    const query = new ReadPostQuery({ id: postId });

    const result: Result<PostProps, PostNotExistsError> = await this.queryBus.execute(query);
    
    return match(result,{
      Ok:(post : PostProps)=>{
        const response = new ResponseBase(post);
        return response;
      },
      Err:(error : PostNotExistsError)=>{
        throw error;
      }
    })
  }
}
