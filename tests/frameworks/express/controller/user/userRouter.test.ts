import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { testserver } from '../../../../test-server';
import { ServiceResponse } from '../../../../../src/presentation/express/common/models/serviceResponse';

describe.skip('', () => {
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
    // Act
    const response = await request(testserver.app).get('/v1/api/users/');
    const result: ServiceResponse = response.body;
    console.log('testting', result);
    // Assert
    expect(response.statusCode).toEqual(StatusCodes.OK);
    expect(result[0].id).toEqual(expect.any(Number));
    expect(result[0].name).toEqual(expect.any(String));
  });

  // it("Should handle SQL injection attempts gracefully", async ()=>{
  //   const { body } = await request(testserver.app).get('/api/v1/role/').query({ id: '1; DROP TABLE roles;' })

  //    // Assert
  //    expect(body.error).toBe(false)
  //    expect(body.statusCode).toBe(200) // debe retornar un error
  // })
});
