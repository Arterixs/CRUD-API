import { ServerResponse, IncomingMessage } from 'node:http';
import { dataBase } from '../model/model.app.js';
import { StatusCode } from '../types/enum.js';
import { isValidUserId } from '../helpers/isValidUserId.js';

export const deleteUserResponse = (res: ServerResponse<IncomingMessage>, clientId: string) => {
  const checkId = isValidUserId(clientId);
  if (checkId) {
    if (dataBase.checkData(clientId)) {
      dataBase.deleteData(clientId);
      res.writeHead(StatusCode.DELETE, {
        'Content-type': 'application/json',
      });
      res.end();
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
};
