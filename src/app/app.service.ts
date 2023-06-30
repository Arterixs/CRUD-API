import { Server } from '../server/server.servise.ts';
import { Model } from '../model/model.service.ts';

export class App {
  private server: Server;

  private model: Model;

  constructor(PORT: string | undefined, ServerClass: typeof Server, ModelClass: typeof Model) {
    this.model = new ModelClass();
    this.server = new ServerClass(PORT);
  }

  public start() {
    this.server.run();
  }
}
