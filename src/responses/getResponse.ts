import { ServerResponse, IncomingMessage } from 'node:http';
import { dataBase } from '../model/model.app.ts';
import { StatusCode } from '../types/enum.ts';

export const getResponse = (res: ServerResponse<IncomingMessage>) => {
  res.writeHead(StatusCode.SUCCES, {
    'Content-type': 'application/json',
  });
  const convert = Array.from(dataBase.readData().values());
  res.end(JSON.stringify(convert));
};
