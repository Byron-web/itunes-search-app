// Import the supertest library for testing HTTP servers
const request = require("supertest");

// Import the server application
const app = require("../server");

// Define a test suite for the server
describe("Server", () => {
  // Define a test case for the '/apple-search' endpoint
  it("should return data from the Apple Search API", async () => {
    // Make a GET request to the '/apple-search' endpoint with a search term
    const response = await request(app).get("/apple-search?term=jack+johnson");

    // Expect the response status code to be 200
    expect(response.status).toBe(200);

    // Expect the response body to match a snapshot (for regression testing)
    expect(response.body).toMatchSnapshot();
  });
});
