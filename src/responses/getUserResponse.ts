import { ServerResponse, IncomingMessage } from 'node:http';
import { dataBase } from '../model/model.app.js';
import { StatusCode } from '../types/enum.js';
import { isValidUserId } from '../helpers/isValidUserId.js';
import { MiddlewareResponse } from '../middlewayer/middlewareResponse.js';

export const getUserResponse = (res: ServerResponse<IncomingMessage>, clientId: string) => {
  const checkId = isValidUserId(clientId);
  if (checkId) {
    if (dataBase.checkData(clientId)) {
      const user = dataBase.getData(clientId);
      MiddlewareResponse(res, StatusCode.SUCCES, user);
    } else {
      MiddlewareResponse(res, StatusCode.NOT_FOUND, { message: 'User is not exsist' });
    }
  } else {
    MiddlewareResponse(res, StatusCode.BAD_REQUEST, { message: 'UserId is not valid' });
  }
};
