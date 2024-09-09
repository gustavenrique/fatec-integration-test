const supertest = require("supertest");
const { app, server } = require("../src/index");

describe("GET /users", () => {
  it("should return 200OK", async () => {
    const response = await supertest(app).get("/users");

    expect(response.statusCode).toBe(200);
  });
});

afterAll(() => {
  server.close();
});
