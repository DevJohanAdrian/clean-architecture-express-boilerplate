import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import type { ServiceResponse } from '../../../../../src/presentation/express/common/models/serviceResponse';
import { testserver } from '../../../../test-server';

describe('Health Check API endpoints', () => {
  beforeAll(async () => {
    await testserver.start();
  });

  afterAll(() => {
    testserver.close();
  });

  it('GET / - success', async () => {
    const response = await request(testserver.app).get('/v1/api/health-check');
    const result: ServiceResponse = response.body;

    expect(response.statusCode).toEqual(StatusCodes.OK);
    expect(result.success).toBeTruthy();
    expect(result.responseObject).toBeNull();
    expect(result.message).toEqual('Service is healthy');
  });
});
