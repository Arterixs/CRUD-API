import { ServerResponse, IncomingMessage } from 'node:http';
import { dataBase } from '../model/model.app.ts';
import { StatusCode } from '../types/enum.ts';

export const getUserResponse = (res: ServerResponse<IncomingMessage>, clientId: string) => {
  if (dataBase.checkData(Number(clientId))) {
    const obj = dataBase.getData(Number(clientId));
    res.writeHead(StatusCode.SUCCES, {
      'Content-type': 'application/json',
    });
    res.end(JSON.stringify(obj));
  } else {
    res.writeHead(StatusCode.NOT_FOUND, {
      'Content-type': 'application/json',
    });
    res.end(JSON.stringify({ message: 'User is not found' }));
  }
};
