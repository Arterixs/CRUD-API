import { ServerResponse, IncomingMessage } from 'node:http';
import { dataBase } from '../model/model.app.js';
import { StatusCode } from '../types/enum.js';
import { ServerUser } from '../types/interface.js';
import { isValidUserObject } from '../helpers/isValidUserObject.js';
import { readBodyResponse } from './readBodyResponse.js';
import { isValidUserId } from '../helpers/isValidUserId.js';
import { MiddlewareResponse } from '../middleware/middlewareResponse.js';
import { CustomError, catchController, INVALID_DATA, USER_ID_NOT_VALID, USER_NOT_EXIST } from '../errors/index.js';

export const putUserResponse = async (clientId: string, res: ServerResponse<IncomingMessage>, req: IncomingMessage) => {
  try {
    const checkId = isValidUserId(clientId);
    if (checkId) {
      if (dataBase.checkData(clientId)) {
        const userObject = await readBodyResponse(req);
        const isValid = isValidUserObject(userObject);
        if (isValid) {
          dataBase.updateData(userObject as ServerUser, clientId);
          MiddlewareResponse(res, StatusCode.SUCCES, userObject);
        }
        throw new CustomError(INVALID_DATA, StatusCode.BAD_REQUEST);
      }
      throw new CustomError(USER_NOT_EXIST, StatusCode.NOT_FOUND);
    }
    throw new CustomError(USER_ID_NOT_VALID, StatusCode.BAD_REQUEST);
  } catch (err) {
    catchController(err, res);
  }
};
