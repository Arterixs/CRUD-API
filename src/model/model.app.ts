import { ServerUser } from '../types/interface.js';

class Model {
  private dataBase: Map<string, ServerUser>;

  constructor() {
    this.dataBase = new Map();
  }

  public setData(data: ServerUser, id: string) {
    this.dataBase.set(id, data);
  }

  public updateData(data: ServerUser, id: string) {
    const updateData = data;
    updateData.id = id;
    this.dataBase.set(id, data);
  }

  public getData(id: string) {
    return this.dataBase.get(id);
  }

  public checkData(id: string) {
    return this.dataBase.has(id);
  }

  public deleteData(id: string) {
    this.dataBase.delete(id);
  }

  public readData() {
    return this.dataBase;
  }
}

export const dataBase = new Model();
