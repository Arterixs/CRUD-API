import 'dotenv/config';
import { createServer, ServerResponse, IncomingMessage } from 'node:http';
import { Method, StatusCode } from './types/enum.ts';
import { User } from './types/interface.ts';
import { dataBase } from './model/model.app.ts';

const { PORT } = process.env;

let num = 0;

const getSimple = (res: ServerResponse<IncomingMessage>) => {
  res.writeHead(StatusCode.SUCCES, {
    'Content-type': 'application/json',
  });
  const convert = Array.from(dataBase.readData().values());
  res.end(JSON.stringify(convert));
};

const hardGet = (res: ServerResponse<IncomingMessage>, clientId: string) => {
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

const postSimple = (req: IncomingMessage): Promise<User> =>
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

const hardPut = (post: User, clientId: string, res: ServerResponse<IncomingMessage>) => {
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

const hardDelete = (res: ServerResponse<IncomingMessage>, clientId: string) => {
  if (dataBase.checkData(Number(clientId))) {
    dataBase.deleteData(Number(clientId));
    res.writeHead(StatusCode.DELETE, {
      'Content-type': 'application/json',
    });
    res.end();
  }
};

// =======================================================================

const server = createServer((req, res) => {
  const clientUrl = req.url;
  const clientMethod = req.method;
  if (clientUrl && clientMethod) {
    const clientId = clientUrl.split('/')[3];
    if (clientId) {
      switch (clientMethod) {
        case Method.GET:
          hardGet(res, clientId);
          break;
        case Method.PUT:
          postSimple(req)
            .then((post) => {
              hardPut(post, clientId, res);
            })
            .catch((err) => console.log(err));
          break;
        case Method.DELETE:
          hardDelete(res, clientId);
          break;
        default:
          break;
      }
    } else {
      switch (clientMethod) {
        case Method.GET:
          getSimple(res);
          break;
        case Method.POST:
          postSimple(req)
            .then((post) => {
              dataBase.setData(post, num);
              num += 1;
              res.writeHead(StatusCode.CREATE, {
                'Content-type': 'application/json',
              });
              res.end(JSON.stringify(post));
            })
            .catch((err) => console.log(err));
          break;
        default:
          break;
      }
    }
  }
});

server.listen(PORT, () => console.log(`Server started on PORT ${PORT || 'default'}`));
