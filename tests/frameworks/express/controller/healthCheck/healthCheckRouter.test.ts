import { StatusCodes } from "http-status-codes";
import request from "supertest";

import type { ServiceResponse } from "../../../../../src/presentation/express/common/models/serviceResponse";
import { Server } from "../../../../../src/presentation/express/server";

describe("Health Check API endpoints", () => {
  it("GET / - success", async () => {
    const response = await request(Server).get("/health-check");
    const result: ServiceResponse = response.body;

    expect(response.statusCode).toEqual(StatusCodes.OK);
    expect(result.success).toBeTruthy();
    expect(result.responseObject).toBeNull();
    expect(result.message).toEqual("Service is healthy");
  });
});
