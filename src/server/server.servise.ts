import { createServer } from 'node:http';
import 'dotenv/config';

export class Server {
  private server: import('http').Server<typeof import('http').IncomingMessage, typeof import('http').ServerResponse>;

  private port: string | undefined;

  constructor(PORT: string | undefined) {
    this.server = createServer((_req, res) => {
      res.writeHead(200, { 'Content-type': 'application/json' });
      res.end(JSON.stringify({ name: 'avav', age: 25 }));
    });
    this.port = PORT;
  }

  public run() {
    this.server.listen(this.port, () => console.log(`Server started on PORT ${this.port || 'default'}`));
  }
}
