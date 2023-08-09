import { ExceptionBase } from '@src/libs/exceptions/exception.base';

export class UserNotExistsError extends ExceptionBase {
  static readonly message = 'User is Not Exists';
  public readonly code = 'USER.NOT_EXISTS';

  constructor(cause?: Error, metadata?: unknown) {
    super(UserNotExistsError.message, cause, metadata);
  }
}
