import { ServerResponse, IncomingMessage } from 'node:http';
import { dataBase } from '../model/model.app.js';
import { StatusCode } from '../types/enum.js';
import { isValidUserId } from '../helpers/isValidUserId.js';
import { MiddlewareResponse } from '../middleware/middlewareResponse.js';
import { CustomError, catchController, USER_ID_NOT_VALID, USER_NOT_EXIST } from '../errors/index.js';

export const getUserResponse = (res: ServerResponse<IncomingMessage>, clientId: string) => {
  try {
    const checkId = isValidUserId(clientId);
    if (checkId) {
      if (dataBase.checkData(clientId)) {
        const user = dataBase.getData(clientId);
        MiddlewareResponse(res, StatusCode.SUCCES, user);
      } else {
        throw new CustomError(USER_NOT_EXIST, StatusCode.NOT_FOUND);
      }
    } else {
      throw new CustomError(USER_ID_NOT_VALID, StatusCode.BAD_REQUEST);
    }
  } catch (err) {
    catchController(err, res);
  }
};
