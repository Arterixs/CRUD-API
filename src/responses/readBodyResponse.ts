import { IncomingMessage } from 'node:http';
import { User } from '../types/interface.ts';

export const readBodyResponse = (req: IncomingMessage): Promise<User> =>
  new Promise((resolve) => {
    const arrData: Buffer[] = [];
    req.on('data', (chunk: Buffer) => {
      arrData.push(chunk);
    });
    req.on('end', () => {
      const correctArrData = JSON.parse(Buffer.concat(arrData).toString()) as User;
      resolve(correctArrData);
    });
  });
