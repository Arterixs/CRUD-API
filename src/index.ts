import 'dotenv/config';
import { createServer } from 'node:http';
import { Method, StatusCode } from './types/enum.ts';
import { getResponse } from './responses/getResponse.ts';
import { getUserResponse } from './responses/getUserResponse.ts';
import { readBodyResponse } from './responses/readBodyResponse.ts';
import { putUserResponse } from './responses/putUserResponse.ts';
import { deleteUserResponse } from './responses/deleteUserResponse.ts';
import { postResponse } from './responses/postResponse.ts';

const { PORT } = process.env;

const server = createServer((req, res) => {
  const clientUrl = req.url;
  const clientMethod = req.method;
  if (clientUrl && clientMethod) {
    const clientId = clientUrl.split('/')[3];
    if (clientId) {
      switch (clientMethod) {
        case Method.GET:
          getUserResponse(res, clientId);
          break;
        case Method.PUT:
          // readBodyResponse(req)
          //   .then((post) => {
          //     putUserResponse(post, clientId, res);
          //   })
          //   .catch((err) => console.log(err));
          break;
        case Method.DELETE:
          deleteUserResponse(res, clientId);
          break;
        default:
          break;
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
          break;
      }
    }
  }
});

server.listen(PORT, () => console.log(`Server started on PORT ${PORT || 'default'}`));
