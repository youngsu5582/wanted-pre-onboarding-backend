import { ExceptionBase } from '@src/libs/exceptions/exception.base';

export class DBInsertError extends ExceptionBase {
  static readonly message = 'DB Insert Error!';
  public readonly code = 'DATABASE.INSERT_ERROR';
  constructor(cause?: Error, metadata?: unknown) {
    super(DBInsertError.message, cause, metadata);
  }
}

export class DBSelectError extends ExceptionBase {
  static readonly message = 'DB Select Error!';
  public readonly code = 'DATABASE.SELECT_ERROR';
  constructor(cause?: Error, metadata?: unknown) {
    super(DBSelectError.message, cause, metadata);
  }
}

export class DBUpdateError extends ExceptionBase {
  static readonly message = 'DB Update Error!';
  public readonly code = 'DATABASE.UPDATE_ERROR';
  constructor(cause?: Error, metadata?: unknown) {
    super(DBUpdateError.message, cause, metadata);
  }
}
