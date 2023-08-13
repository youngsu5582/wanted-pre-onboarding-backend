import { Post, User } from '@prisma/client';

export type CreatePostProps = Pick<Post, 'title' | 'content' | 'imageUrl'>;

export type PostProps = Pick<Post, 'title' | 'content' | 'userId' | 'imageUrl'>;

export type ReadPostProps = Pick<Post, 'id'>;

export type UpdatePostProps = CreatePostProps;

export type PostResultWithNull =
  | (Pick<Post, 'title' | 'content' | 'userId' | 'imageUrl'> & {
      user: Pick<User, 'nickname'>;
    })
  | null;

export type PostsResult = Pick<Post, 'id' | 'title'> & {
  user: Pick<User, 'nickname'>;
};
