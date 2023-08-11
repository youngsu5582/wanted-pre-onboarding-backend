import { BasePrismaRepository } from '@src/libs/database/base-prisma-repository';
import PostRepositoryPort from './post.repository.port';
import { PostEntity } from '../domain/post.entity';
import { PaginatedQueryParams } from '@src/libs/ddd/query-base';
import { Paginated } from '@src/libs/ddd/repository.port';

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
  async readPosts(params: PaginatedQueryParams) {
    const record = await this.post.findMany({
      select: { id: true , title : true,user:{select:{email:true}} },
      take: params.limit,
      skip: params.offset,
      orderBy: { createdAt: params.orderBy.param },
    });
    return new Paginated({
      data: record,
      count: record.length,
      limit: params.limit,
      page: params.page,
    });
  }
  async readPost(postId: string) {
    return await this.post.findUnique({
      select: { title: true, content: true, userId: true },
      where: { id: postId },
    });
  }
  async updatePost(postId: string, entity: PostEntity) {
    const props = entity.getProps();
    await this.post.update({
      where: { id: postId },
      data: { ...props, updatedAt: entity.updatedAt },
    });
    return;
  }
  async matchAuthorAndUser(postId: string, userId: string) {
    return Boolean(
      await this.post.findFirst({ where: { id: postId, userId } }),
    );
  }
  async deletePost(postId: string) {
    await this.post.delete({ where: { id: postId } });
    return;
  }
}
