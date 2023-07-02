import { ServerResponse, IncomingMessage } from 'node:http';
import { dataBase } from '../model/model.app.ts';
import { StatusCode } from '../types/enum.ts';
import { User } from '../types/interface.ts';

export const putUserResponse = (post: User, clientId: string, res: ServerResponse<IncomingMessage>) => {
  if (dataBase.checkData(Number(clientId))) {
    dataBase.setData(post, Number(clientId));
    res.writeHead(StatusCode.SUCCES, {
      'Content-type': 'application/json',
    });
    res.end(JSON.stringify(post));
  } else {
    res.writeHead(StatusCode.NOT_FOUND, {
      'Content-type': 'application/json',
    });
    res.end(JSON.stringify({ message: 'User is not found' }));
  }
};
