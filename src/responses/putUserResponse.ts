import { ServerResponse, IncomingMessage } from 'node:http';
import { dataBase } from '../model/model.app.ts';
import { StatusCode } from '../types/enum.ts';
import { ServerUser } from '../types/interface.ts';
import { isValidUserObject } from '../helpers/isValidUserObject.ts';
import { readBodyResponse } from './readBodyResponse.ts';
import { isValidUserId } from '../helpers/isValidUserId.ts';

export const putUserResponse = async (clientId: string, res: ServerResponse<IncomingMessage>, req: IncomingMessage) => {
  try {
    const checkId = isValidUserId(clientId);
    if (checkId) {
      if (dataBase.checkData(clientId)) {
        const userObject = await readBodyResponse(req);
        const isValid = isValidUserObject(userObject);
        if (isValid) {
          dataBase.setData(userObject as ServerUser, clientId);
          res.writeHead(StatusCode.SUCCES, {
            'Content-type': 'application/json',
          });
          res.end(JSON.stringify(userObject));
        } else {
          res.writeHead(StatusCode.BAD_REQUEST, {
            'Content-type': 'application/json',
          });
          res.end(JSON.stringify({ message: 'Invalid data in request' }));
        }
      } else {
        res.writeHead(StatusCode.NOT_FOUND, {
          'Content-type': 'application/json',
        });
        res.end(JSON.stringify({ message: 'User is not exsist' }));
      }
    } else {
      res.writeHead(StatusCode.BAD_REQUEST, {
        'Content-type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'UserId is not valid' }));
    }
  } catch (err) {
    res.writeHead(StatusCode.SERVER_ERROR, {
      'Content-type': 'application/json',
    });
    res.end(JSON.stringify({ message: 'Invalid data in request' }));
  }
  // if (dataBase.checkData(clientId)) {
  //   dataBase.setData(post, Number(clientId));
  //   res.writeHead(StatusCode.SUCCES, {
  //     'Content-type': 'application/json',
  //   });
  //   res.end(JSON.stringify(post));
  // } else {
  //   res.writeHead(StatusCode.NOT_FOUND, {
  //     'Content-type': 'application/json',
  //   });
  //   res.end(JSON.stringify({ message: 'User is not found' }));
  // }
};
