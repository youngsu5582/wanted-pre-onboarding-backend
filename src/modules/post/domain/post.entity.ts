import { randomId } from '@src/utils/random-id';
import { AggregateId, AggregateRoot } from '@src/libs/ddd/aggregate-root-base';
import { PostProps } from './post.types';
import { PostCreatedDomainEvent } from './events/post-created.domain-event';
import { PostUpdatedDomainEvent } from './events/post-updated.domain-event';

export class PostEntity extends AggregateRoot<PostProps> {
  protected readonly _id: AggregateId;
  protected readonly _userId: string;
  static create(postProps: PostProps): PostEntity {
    const id = randomId();
    const props: PostProps = { ...postProps };
    const post = new PostEntity({ id, props });
    post.addEvent(
      new PostCreatedDomainEvent({ aggregatedId: id, userId: props.userId }),
    );
    return post;
  }
  static update(postId: string, postProps: PostProps): PostEntity {
    const props: PostProps = { ...postProps };
    const post = new PostEntity({ id: postId, props });
    post.addEvent(
      new PostUpdatedDomainEvent({
        aggregatedId: postId,
        userId: props.userId,
      }),
    );
    return post;
  }
}
