import { ServerResponse, IncomingMessage } from 'node:http';
import { User } from '../types/interface.js';
import { setIdUserObject } from '../helpers/setIdUserObject.js';
import { readBodyResponse } from './readBodyResponse.js';
import { isValidUserObject } from '../helpers/isValidUserObject.js';
import { StatusCode } from '../types/enum.js';
import { dataBase } from '../model/model.app.js';
import { MiddlewareResponse } from '../middleware/middlewareResponse.js';
import { CustomError, catchController, INVALID_DATA } from '../errors/index.js';

export const postResponse = async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
  try {
    const userObject = await readBodyResponse(req);
    const isValid = isValidUserObject(userObject);
    if (isValid) {
      const { userId, updateUser } = setIdUserObject(userObject as User);
      dataBase.setData(updateUser, userId);
      MiddlewareResponse(res, StatusCode.CREATE, updateUser);
    } else {
      throw new CustomError(INVALID_DATA, StatusCode.BAD_REQUEST);
    }
  } catch (err) {
    catchController(err, res);
  }
};
