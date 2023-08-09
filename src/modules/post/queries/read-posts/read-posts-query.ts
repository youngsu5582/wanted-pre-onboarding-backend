import { PaginatedParams, PaginatedQueryBase } from '@src/libs/ddd/query-base';

export class ReadPostsQuery extends PaginatedQueryBase {
  constructor(props: PaginatedParams<ReadPostsQuery>) {
    super(props);
  }
}
