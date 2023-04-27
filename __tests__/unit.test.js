// Import the supertest library and the Express app
const request = require("supertest");
const app = require("../server");

// Describe a test suite for the GET / endpoint
describe("GET /", () => {
  // Test to check if the response has a status code of 200
  it("should respond with status code 200", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });
});
