import { ServerResponse, IncomingMessage } from 'node:http';
import { dataBase } from '../model/model.app.js';
import { StatusCode } from '../types/enum.js';
import { ServerUser } from '../types/interface.js';
import { isValidUserObject } from '../helpers/isValidUserObject.js';
import { readBodyResponse } from './readBodyResponse.js';
import { isValidUserId } from '../helpers/isValidUserId.js';
import { MiddlewareResponse } from '../middlewayer/middlewareResponse.js';

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
        } else {
          MiddlewareResponse(res, StatusCode.BAD_REQUEST, { message: 'Invalid data in request' });
        }
      } else {
        MiddlewareResponse(res, StatusCode.NOT_FOUND, { message: 'User is not exsist' });
      }
    } else {
      MiddlewareResponse(res, StatusCode.BAD_REQUEST, { message: 'UserId is not valid' });
    }
  } catch (err) {
    MiddlewareResponse(res, StatusCode.SERVER_ERROR, { message: 'Invalid data in request' });
  }
};
