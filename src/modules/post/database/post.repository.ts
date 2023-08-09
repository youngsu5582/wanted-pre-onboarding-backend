import { BasePrismaRepository } from '@src/libs/database/base-prisma-repository';
import PostRepositoryPort from './post.repository.port';
import { PostEntity } from '../domain/post.entity';

export class PostRepository
  extends BasePrismaRepository
  implements PostRepositoryPort
{
  constructor() {
    super();
  }
  async createPost(entity: PostEntity) {
    const props = entity.getProps();
    const post = await this.post.create({
      data: { ...props, createdAt: entity.createdAt, userId: props.userId },
    });
    if (post) return true;
    else return false;
  }
}
