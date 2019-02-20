import { agent } from 'supertest';

import { app } from '../app';
import { Account } from '../entity/Account';

jest.mock('../entity/Account');

const server = app.listen();
const request = agent(server);

describe('ROUTE accounts/', () => {
  beforeEach(async (done) => {
    jest.clearAllMocks();
    done();
  });
  afterEach(async () => {
    await server.close();
  });

  describe(`GET accounts/`, async () => {
    it("should display 'Hello, World!'", async (done) => {
      const user = new Account();
      user.firstName = 'test';
      user.lastName = 'test';
      jest.spyOn(Account, 'find').mockReturnValue(Promise.resolve([user]));
      const response = await request.get('/api/v1/accounts/');
      expect(response.status).toEqual(200);
      expect(response.text).toEqual('[' + JSON.stringify(user) + ']');
      done();
    });
  });
});
