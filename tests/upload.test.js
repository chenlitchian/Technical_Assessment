const app = require("../server/index");
const request = require("supertest");

describe("File Upload API", () => {
  it("uploads a CSV file successfully", async () => {
    const res = await request(app)
      .post("/upload")
      .attach("file", "tests/testfiles/test.csv"); // Path to your test CSV file

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
});
