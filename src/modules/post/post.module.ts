import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProviderModule } from '@src/providers/provider.module';
import { CreatePostController } from './commands/create-post/create-post.controller';
import { CreatePostCommandHandler } from './commands/create-post/create-post.service';
import { POST_REPOSITORY } from './post.di-token';
import { PostRepository } from './database/post.repository';

const httpControllers = [CreatePostController];
const commandHandlers: Provider[] = [CreatePostCommandHandler];
const repositories: Provider[] = [
  { provide: POST_REPOSITORY, useClass: PostRepository },
];
@Module({
  imports: [CqrsModule, ProviderModule],
  controllers: [...httpControllers],
  providers: [...repositories, ...commandHandlers],
})
export class PostModule {}
