import { User } from '../types/interface.ts';

class Model {
  private dataBase: Map<number, User>;

  constructor() {
    this.dataBase = new Map();
  }

  public setData(data: User, id: number) {
    this.dataBase.set(id, data);
  }

  public getData(id: number) {
    return this.dataBase.get(id);
  }

  public checkData(id: number) {
    return this.dataBase.has(id);
  }

  public deleteData(id: number) {
    this.dataBase.delete(id);
  }

  public readData() {
    return this.dataBase;
  }
}

export const dataBase = new Model();
