import { ServerResponse, IncomingMessage } from 'node:http';
import { User } from '../types/interface.ts';
import { readBodyResponse } from './readBodyResponse.ts';
import { isValidUserObject } from '../helpers/isValidUserObject.ts';
import { StatusCode } from '../types/enum.ts';
import { dataBase } from '../model/model.app.ts';

let num = 0;

export const postResponse = async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
  try {
    const userObject = await readBodyResponse(req);
    const isValid = isValidUserObject(userObject);
    if (isValid) {
      dataBase.setData(userObject as User, num);
      num += 1;
      res.writeHead(StatusCode.CREATE, {
        'Content-type': 'application/json',
      });
      res.end(JSON.stringify(userObject));
    } else {
      res.writeHead(StatusCode.BAD_REQUEST, {
        'Content-type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'User is not valid' }));
    }
  } catch (err) {
    res.writeHead(StatusCode.SERVER_ERROR, {
      'Content-type': 'application/json',
    });
    res.end(JSON.stringify({ message: 'User is not valid' }));
  }
};
