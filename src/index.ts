import 'dotenv/config';
import { createServer } from 'node:http';
import { Method, StatusCode } from './types/enum.ts';
import { dataBase } from './model/model.app.ts';
import { getResponse } from './responses/getResponse.ts';
import { getUserResponse } from './responses/getUserResponse.ts';
import { readBodyResponse } from './responses/readBodyResponse.ts';
import { putUserResponse } from './responses/putUserResponse.ts';
import { deleteUserResponse } from './responses/deleteUserResponse.ts';

const { PORT } = process.env;

let num = 0;

// =======================================================================

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
          readBodyResponse(req)
            .then((post) => {
              putUserResponse(post, clientId, res);
            })
            .catch((err) => console.log(err));
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
          readBodyResponse(req)
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
