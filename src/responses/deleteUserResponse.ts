import { ServerResponse, IncomingMessage } from 'node:http';
import { dataBase } from '../model/model.app.ts';
import { StatusCode } from '../types/enum.ts';

export const deleteUserResponse = (res: ServerResponse<IncomingMessage>, clientId: string) => {
  if (dataBase.checkData(clientId)) {
    dataBase.deleteData(clientId);
    res.writeHead(StatusCode.DELETE, {
      'Content-type': 'application/json',
    });
    res.end();
  }
};
