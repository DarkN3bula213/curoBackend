import {app} from "../../src/app";
import {mockConnect} from "../database/mock";
import {mockApiKey,API_KEY} from "./mock";
import supertest from "supertest";
import request from "supertest";


describe("apikey validation", () => {
  const endpoint = "/api/health-check";
  const request = supertest(app);

  beforeEach(() => {
    mockApiKey.mockClear();
  });

  it("Should response with 400 if x-api-key header is not passed", async () => {
    const response = await request.get(endpoint).timeout(2000);
    expect(response.status).toBe(400);
    expect(mockApiKey).not.toHaveBeenCalled();
  });

  it("Should response with 403 if wrong x-api-key header is passed", async () => {
    const wrongApiKey = "123";
    const response = await request
      .get(endpoint)
      .set("x-api-key", wrongApiKey)
      .timeout(2000);
    expect(response.status).toBe(403);
    expect(mockApiKey).toHaveBeenCalledTimes(1);
    expect(mockApiKey).toHaveBeenCalledWith(wrongApiKey);
  });

  it("Should response with 404 if correct x-api-key header is passed and when route is not handelled", async () => {
    const response = await request
      .get(endpoint)
      .set("x-api-key", API_KEY)
      .timeout(2000);
    expect(response.status).toBe(404);
    expect(mockApiKey).toBeCalledTimes(1);
    expect(mockApiKey).toBeCalledWith(API_KEY);
  });
});
