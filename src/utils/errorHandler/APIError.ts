import {CustomError} from '../../core/models';

export class APIError extends Error {
  private readonly status:number;
  private readonly error : string;
  private readonly isPublic : boolean;

  /**
    * Creates an API error.
    * @param {String} message - Error message.
    * @param {Array} errors - Array of validation fields Errors.
    * @param {Number} status - HTTP status code of error.
    * @param {Boolean} isPublic - Whether the message should be visible to user or not.
    */
  constructor({
    message = '',
    stack = '',
    error = '',
    status = 500, 
    isPublic = false,
  }) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.error = error;
    this.status = status;
    this.isPublic = isPublic;
    this.stack = stack;
  }
}
