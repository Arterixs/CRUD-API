import { ServerResponse, IncomingMessage } from 'node:http';
import { User } from '../types/interface.ts';
import { setIdUserObject } from '../helpers/setIdUserObject.ts';
import { readBodyResponse } from './readBodyResponse.ts';
import { isValidUserObject } from '../helpers/isValidUserObject.ts';
import { StatusCode } from '../types/enum.ts';
import { dataBase } from '../model/model.app.ts';

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
      res.end(JSON.stringify(userObject));
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
