import request from 'supertest';
import { StatusCodes } from 'http-status-codes';

import { testserver } from '../../../../test-server';
// import type { ServiceResponse } from "../../../../../src/presentation/express/common/models/serviceResponse";

describe('', () => {
  beforeAll(async () => {
    if (!testserver.isRunning()) {
      await testserver.start();
    }
  });

  afterAll(() => {
    if (testserver.isRunning()) {
      testserver.close();
    }
  });

  it('Should return all users on db and ok status code', async () => {
    const response = await request(testserver.app).get('/v1/api/users/');

    expect(response.statusCode).toEqual(StatusCodes.OK);
  });
});
