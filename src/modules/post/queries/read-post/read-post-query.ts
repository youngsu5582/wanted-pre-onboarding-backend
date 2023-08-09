import { QueryBase } from '@src/libs/ddd/query-base';
import { ReadPostProps } from '../../domain/post.types';

export class ReadPostQuery extends QueryBase {
  postId: string;
  constructor(props: ReadPostProps) {
    super();
    this.postId = props.id;
  }
}
