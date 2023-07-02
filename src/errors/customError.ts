import { StatusCode } from '../types/enum.js';

export class CustomError extends Error {
  code: StatusCode;

  constructor(message: string, code: StatusCode) {
    super(message);
    this.name = 'CustomError';
    this.code = code;
  }
}
