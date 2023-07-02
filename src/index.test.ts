import request from 'supertest';
import { ServerUser } from './types/interface.js';
import { StatusCode } from './types/enum.js';
import { server } from './index.js';

const DEFAUTL_OBJECT = {
  username: 'User',
  age: 26,
  hobbies: ['rock climbing'],
};

const UPDATE_OBJECT = {
  username: 'Abdulla',
  age: 62,
  hobbies: ['programming'],
};

describe('CRUD-API Test Scenarios', () => {
  const response = request(server);

  test('should get an empty array on get request', async () => {
    const getRequest = await response.get('/api/users').set('Accept', 'application/json');
    expect(getRequest.status).toBe(StatusCode.SUCCES);
    expect(JSON.parse(getRequest.text)).toEqual([]);
    server.close();
  });

  test('should create and return user object', async () => {
    const postRequest = await response.post('/api/users').send(DEFAUTL_OBJECT).set('Accept', 'application/json');
    expect(postRequest.status).toBe(StatusCode.CREATE);
    const userServer = JSON.parse(postRequest.text) as ServerUser;
    const copyObject = JSON.parse(JSON.stringify(DEFAUTL_OBJECT)) as ServerUser;
    copyObject.id = userServer.id;
    expect(copyObject).toEqual(userServer);
    server.close();
  });

  test('should get the created user', async () => {
    const postRequest = await response.post('/api/users').send(DEFAUTL_OBJECT).set('Accept', 'application/json');
    expect(postRequest.status).toBe(StatusCode.CREATE);
    const userServer = JSON.parse(postRequest.text) as ServerUser;
    const copyObject = JSON.parse(JSON.stringify(DEFAUTL_OBJECT)) as ServerUser;
    copyObject.id = userServer.id;

    const getUserRequest = await response.get(`/api/users/${userServer.id}`).set('Accept', 'application/json');
    expect(getUserRequest.status).toBe(StatusCode.SUCCES);
    expect(JSON.parse(getUserRequest.text)).toEqual(copyObject);
    server.close();
  });

  test('should update and get the user', async () => {
    const postRequest = await response.post('/api/users').send(DEFAUTL_OBJECT).set('Accept', 'application/json');
    expect(postRequest.status).toBe(StatusCode.CREATE);
    const userServer = JSON.parse(postRequest.text) as ServerUser;
    const copyObject = JSON.parse(JSON.stringify(UPDATE_OBJECT)) as ServerUser;
    copyObject.id = userServer.id;

    const getPutRequest = await response
      .put(`/api/users/${userServer.id}`)
      .send(UPDATE_OBJECT)
      .set('Accept', 'application/json');
    expect(getPutRequest.status).toBe(StatusCode.SUCCES);
    expect(JSON.parse(getPutRequest.text)).toEqual(copyObject);
    server.close();
  });

  test('should delete the user and return confirmation', async () => {
    const postRequest = await response.post('/api/users').send(DEFAUTL_OBJECT).set('Accept', 'application/json');
    expect(postRequest.status).toBe(StatusCode.CREATE);
    const userServer = JSON.parse(postRequest.text) as ServerUser;

    const getDeleteRequest = await response.delete(`/api/users/${userServer.id}`).set('Accept', 'application/json');
    expect(getDeleteRequest.status).toBe(StatusCode.DELETE);
    server.close();
  });

  test('should query the remote user and get a response', async () => {
    const postRequest = await response.post('/api/users').send(DEFAUTL_OBJECT).set('Accept', 'application/json');
    expect(postRequest.status).toBe(StatusCode.CREATE);

    const userServer = JSON.parse(postRequest.text) as ServerUser;
    const getDeleteRequest = await response.delete(`/api/users/${userServer.id}`).set('Accept', 'application/json');
    expect(getDeleteRequest.status).toBe(StatusCode.DELETE);

    const getUserRequest = await response.delete(`/api/users/${userServer.id}`).set('Accept', 'application/json');
    expect(getUserRequest.status).toBe(StatusCode.NOT_FOUND);
    server.close();
  });
});
