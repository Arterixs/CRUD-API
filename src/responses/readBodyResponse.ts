import { IncomingMessage } from 'node:http';

export const readBodyResponse = (req: IncomingMessage): Promise<unknown> =>
  new Promise((resolve, reject) => {
    const arrData: Buffer[] = [];
    req.on('data', (chunk: Buffer) => {
      arrData.push(chunk);
    });
    req.on('end', () => {
      try {
        const userObject = JSON.parse(Buffer.concat(arrData).toString()) as unknown;
        resolve(userObject);
      } catch (err) {
        reject();
      }
    });
  });
