import { ServerResponse, IncomingMessage } from 'node:http';
import { StatusCode } from '../types/enum.js';

export const MiddlewareResponse = (res: ServerResponse<IncomingMessage>, code: StatusCode, message: any = null) => {
  res.writeHead(code, {
    'Content-type': 'application/json',
  });
  res.end(JSON.stringify(message));
  console.log(code, message);
};
