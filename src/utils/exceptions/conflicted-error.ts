import ClientError from './client-error';

class ConflictedError extends ClientError {
  constructor(message: string) {
    super(message, 409);
  }
}

export default ConflictedError;
