import { ServerResponse, IncomingMessage } from 'node:http';
import { dataBase } from '../model/model.app.js';
import { StatusCode } from '../types/enum.js';
import { isValidUserId } from '../helpers/isValidUserId.js';
import { MiddlewareResponse } from '../middlewayer/middlewareResponse.js';

export const deleteUserResponse = (res: ServerResponse<IncomingMessage>, clientId: string) => {
  const checkId = isValidUserId(clientId);
  if (checkId) {
    if (dataBase.checkData(clientId)) {
      dataBase.deleteData(clientId);
      MiddlewareResponse(res, StatusCode.DELETE);
    } else {
      MiddlewareResponse(res, StatusCode.NOT_FOUND, { message: 'User is not exsist' });
    }
  } else {
    MiddlewareResponse(res, StatusCode.BAD_REQUEST, { message: 'UserId is not valid' });
  }
};
