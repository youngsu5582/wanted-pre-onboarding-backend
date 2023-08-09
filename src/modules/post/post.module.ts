import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProviderModule } from '@src/providers/provider.module';
import { CreatePostController } from './commands/create-post/create-post.controller';
import { CreatePostCommandHandler } from './commands/create-post/create-post.service';
import { POST_REPOSITORY } from './post.di-token';
import { PostRepository } from './database/post.repository';
import { ReadPostController } from './queries/read-posts/read-posts.controller';
import { ReadPostsQueryHandler } from './queries/read-posts/read-posts.service';

const httpControllers = [CreatePostController, ReadPostController];
const commandHandlers: Provider[] = [CreatePostCommandHandler];
const queryHandlers: Provider[] = [ReadPostsQueryHandler];
const repositories: Provider[] = [
  { provide: POST_REPOSITORY, useClass: PostRepository },
];
@Module({
  imports: [CqrsModule, ProviderModule],
  controllers: [...httpControllers],
  providers: [...repositories, ...commandHandlers, ...queryHandlers],
})
export class PostModule {}
