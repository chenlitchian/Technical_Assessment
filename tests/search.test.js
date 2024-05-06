const request = require("supertest");
const assert = require("assert");
let app;

describe("Data API", function () {
  beforeEach(() => {
    app = require("../server/index");
  });
  it("responds with JSON containing data", async () => {
    const res = await request(app).get(
      "/data?search=voluptates&page=1&limit=10"
    );
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body.data).toBeTruthy(); // Check if data exists
    expect(res.body.totalCount).toBeTruthy(); // Check if totalCount is greater than 0
  });

  it("responds with 404 and no result message when search result is empty", async () => {
    const res = await request(app).get(
      "/data?search=nonexistent&page=1&limit=10"
    );
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("No result found.");
  });
  afterEach(() => {
    app.close(); // Close the server after each test
  });
});
