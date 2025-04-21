export class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;

    if (process.env.NODE_ENV === 'production') {
      delete this.stack;
    }
  }
}
