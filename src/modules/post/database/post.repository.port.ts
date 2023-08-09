import { PostEntity } from '../domain/post.entity';

export default interface PostRepositoryPort {
  createPost: (entity: PostEntity) => Promise<boolean>;
}
