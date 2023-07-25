import { ServerResponse, IncomingMessage } from 'node:http';
import { StatusCode } from '../types/enum.js';
import { MiddlewareResponse } from '../middleware/middlewareResponse.js';
import { CustomError } from './customError.js';

export const catchController = (err: unknown, res: ServerResponse<IncomingMessage>) => {
  if (err instanceof CustomError) {
    MiddlewareResponse(res, err.code, { message: err.message });
  } else {
    MiddlewareResponse(res, StatusCode.SERVER_ERROR, { message: 'Invalid data in request' });
  }
};
