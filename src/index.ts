import 'dotenv/config';
import { createServer } from 'node:http';
import { Method, StatusCode } from './types/enum.ts';
import { getResponse } from './responses/getResponse.ts';
import { getUserResponse } from './responses/getUserResponse.ts';
import { putUserResponse } from './responses/putUserResponse.ts';
import { deleteUserResponse } from './responses/deleteUserResponse.ts';
import { postResponse } from './responses/postResponse.ts';
import { isValidUrlPath } from './helpers/isValidUrlPath.ts';

const { PORT } = process.env;

const server = createServer((req, res) => {
  try {
    const clientUrl = req.url;
    const clientMethod = req.method;
    const urlPaths = clientUrl?.split('/');
    isValidUrlPath(clientUrl, clientMethod, urlPaths);
    const clientId = urlPaths?.at(3);
    if (clientId) {
      switch (clientMethod) {
        case Method.GET:
          getUserResponse(res, clientId);
          break;
        case Method.PUT:
          putUserResponse(clientId, res, req).catch(() => {
            res.writeHead(StatusCode.SERVER_ERROR, {
              'Content-type': 'application/json',
            });
            res.end(JSON.stringify({ message: 'Server error' }));
          });
          break;
        case Method.DELETE:
          deleteUserResponse(res, clientId);
          break;
        default:
          throw new Error();
      }
    } else {
      switch (clientMethod) {
        case Method.GET:
          getResponse(res);
          break;
        case Method.POST:
          postResponse(req, res).catch(() => {
            res.writeHead(StatusCode.SERVER_ERROR, {
              'Content-type': 'application/json',
            });
            res.end(JSON.stringify({ message: 'Server error' }));
          });
          break;
        default:
          throw new Error();
      }
    }
  } catch (err) {
    res.writeHead(StatusCode.NOT_FOUND, {
      'Content-type': 'application/json',
    });
    res.end(JSON.stringify({ message: 'Url is not found' }));
  }
});

server.listen(PORT, () => console.log(`Server started on PORT ${PORT || 'default'}`));
