import { PaginatedQueryParams } from '@src/libs/ddd/query-base';
import { PostEntity } from '../domain/post.entity';
import { PostProps, ReadPostProps } from '../domain/post.types';
import { Paginated } from '@src/libs/ddd/repository.port';

export default interface PostRepositoryPort {
  createPost: (entity: PostEntity) => Promise<boolean>;
  readPosts: (
    params?: PaginatedQueryParams,
  ) => Promise<Paginated<ReadPostProps>>;
  readPost: (postId: string) => Promise<PostProps | null>;
  updatePost: (postId: string, entity: PostEntity) => Promise<void>;
  matchAuthorAndUser: (postId: string, userId: string) => Promise<boolean>;
  deletePost: (postId: string) => Promise<void>;
}
