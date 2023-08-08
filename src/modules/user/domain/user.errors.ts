import { ExceptionBase } from '@src/libs/exceptions/exception.base';

export class UserAlreadyExistsError extends ExceptionBase {
  static readonly message = 'User already Exists';
  public readonly code = 'USER.ALREAD_EXISTS';
  constructor(cause?: Error, metadata?: unknown) {
    super(UserAlreadyExistsError.message, cause, metadata);
  }
}
export class UserNotExistsError extends ExceptionBase {
  static readonly message = 'User is Not Exists';
  public readonly code = 'USER.NOT_EXISTS';

  constructor(cause?: Error, metadata?: unknown) {
    super(UserNotExistsError.message, cause, metadata);
  }
}
export class UserPasswordNotCorrectError extends ExceptionBase {
  static readonly message = 'Password is Not Correct';
  public readonly code = 'USER.PASS_NOT_CORRECT';
  constructor(cause?: Error, metadata?: unknown) {
    super(UserPasswordNotCorrectError.message, cause, metadata);
  }
}
