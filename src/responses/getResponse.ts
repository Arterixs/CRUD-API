import { ServerResponse, IncomingMessage } from 'node:http';
import { dataBase } from '../model/model.app.js';
import { StatusCode } from '../types/enum.js';
import { MiddlewareResponse } from '../middlewayer/middlewareResponse.js';

export const getResponse = (res: ServerResponse<IncomingMessage>) => {
  const convert = Array.from(dataBase.readData().values());
  MiddlewareResponse(res, StatusCode.SUCCES, convert);
};
