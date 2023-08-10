import { ExceptionBase } from '@src/libs/exceptions/exception.base';

export class PostNotExistsError extends ExceptionBase {
  static readonly message = 'Post is Not Exists';
  public readonly code = 'POST.NOT_EXISTS';

  constructor(cause?: Error, metadata?: unknown) {
    super(PostNotExistsError.message, cause, metadata);
  }
}
