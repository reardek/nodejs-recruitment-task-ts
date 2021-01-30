import connection, { request } from "./connectionTest";

beforeAll(async (done) => {
  await connection.create();
  done()
});

afterAll(async (done) => {
  await connection.close();
  done();
});

describe("User test units", () => {
  it("Auth user", async (done) => {
    const response = await request.post("/auth").send({
      username: "basic-thomas",
      password: "sR-_pcoow-27-6PAwCD8",
    });
    expect(response.status).toBe(200);
    done();
  });

  it("Auth user with incorect password", async (done) => {
    const response = await request.post("/auth").send({
      username: "basic-thomas",
      password: "incorect",
    });
    expect(response.status).toBe(401);
    done();
  });
});
