

class BaseError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BaseError.prototype);
    this.name = "BaseError";
  }
}

export class DuplicateFoundError extends BaseError {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, DuplicateFoundError.prototype);
    this.name = "DuplicateFoundError";
  }
}
