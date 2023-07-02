import { ServerResponse, IncomingMessage } from 'node:http';
import { dataBase } from '../model/model.app.js';
import { StatusCode } from '../types/enum.js';
import { isValidUserId } from '../helpers/isValidUserId.js';
import { MiddlewareResponse } from '../middleware/middlewareResponse.js';
import { CustomError } from '../errors/customError.js';
import { catchController } from '../errors/catchController.js';
import { USER_ID_NOT_VALID, USER_NOT_EXIST } from '../errors/constants.js';

export const deleteUserResponse = (res: ServerResponse<IncomingMessage>, clientId: string) => {
  try {
    const checkId = isValidUserId(clientId);
    if (checkId) {
      if (dataBase.checkData(clientId)) {
        dataBase.deleteData(clientId);
        MiddlewareResponse(res, StatusCode.DELETE);
      }
      throw new CustomError(USER_NOT_EXIST, StatusCode.NOT_FOUND);
    }
    throw new CustomError(USER_ID_NOT_VALID, StatusCode.BAD_REQUEST);
  } catch (err) {
    catchController(err, res);
  }
};
