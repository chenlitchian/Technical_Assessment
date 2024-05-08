const request = require("supertest");

let app;
describe("File Upload API", () => {
  beforeEach(() => {
    app = require("../server/index");
  });
  it("uploads a CSV file successfully", async () => {
    const res = await request(app)
      .post("/upload")
      .attach("file", "tests/testfiles/data.csv"); // Path to your test CSV file

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("File uploaded successfully");
  });

  it("returns an error if no file is uploaded", async () => {
    const res = await request(app).post("/upload");

    expect(res.status).toBe(400);
    expect(res.text).toBe("No file uploaded");
  });

  it("returns an error if wrong file format is uploaded", async () => {
    const res = await request(app)
      .post("/upload")
      .attach("file", "tests/testfiles/test.text"); // text file

    expect(res.status).toBe(400);
    expect(res.text).toBe("Only CSV files are allowed");
  });
  afterEach(() => {
    app.close(); // Close the server after each test
  });
});

describe("GET /data", function () {
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
