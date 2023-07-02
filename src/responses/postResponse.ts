import { ServerResponse, IncomingMessage } from 'node:http';
import { User } from '../types/interface.js';
import { setIdUserObject } from '../helpers/setIdUserObject.js';
import { readBodyResponse } from './readBodyResponse.js';
import { isValidUserObject } from '../helpers/isValidUserObject.js';
import { StatusCode } from '../types/enum.js';
import { dataBase } from '../model/model.app.js';

export const postResponse = async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
  try {
    const userObject = await readBodyResponse(req);
    const isValid = isValidUserObject(userObject);
    if (isValid) {
      const { userId, updateUser } = setIdUserObject(userObject as User);
      dataBase.setData(updateUser, userId);
      res.writeHead(StatusCode.CREATE, {
        'Content-type': 'application/json',
      });
      res.end(JSON.stringify(updateUser));
    } else {
      res.writeHead(StatusCode.BAD_REQUEST, {
        'Content-type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'Invalid data in request' }));
    }
  } catch (err) {
    res.writeHead(StatusCode.SERVER_ERROR, {
      'Content-type': 'application/json',
    });
    res.end(JSON.stringify({ message: 'Invalid data in request' }));
  }
};
