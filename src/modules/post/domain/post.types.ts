import { Post } from '@prisma/client';

export type CreatePostProps = Pick<Post, 'title' | 'content'>;

export type PostProps = Pick<Post, 'title' | 'content' | 'userId'>;

export type ReadPostProps = Pick<Post,"id">;