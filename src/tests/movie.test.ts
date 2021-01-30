import connection, { request } from "./connectionTest";
import { getConnection, getRepository } from "typeorm";

beforeAll(async () => {
  await connection.create();
});

afterAll(async (done) => {
  await connection.close();
  done();
});

beforeEach(async (done) => {
  await connection.reset();
  done();
});

const sendMovies = async (username: string, password: string) => {
  const responseToken = await request.post("/auth").send({
    username,
    password,
  });

  const { token } = responseToken.body;
  for (const movie of movies)
    await request
      .post("/movie")
      .set("Authorization", "Bearer " + token)
      .send({ title: movie });

  const response = await request
    .post("/movie")
    .set("Authorization", "Bearer " + token)
    .send({ title: "Akira" });
  return response;
};

const movies = [
  "Mad Max",
  "Avatar",
  "Kill Bill",
  "God Father",
  "Apocalypse Now",
];

describe("Movie test units", () => {
  it("Put movie from authorized user", async (done) => {
    const responseToken = await request.post("/auth").send({
      username: "basic-thomas",
      password: "sR-_pcoow-27-6PAwCD8",
    });
    const { token } = responseToken.body;
    const response = await request
      .post("/movie")
      .set("Authorization", "Bearer " + token)
      .send({ title: movies[0] });
    expect(response.status).toBe(200);
    done();
  });

  it("Put more then 5 movies for basic user", async (done) => {
    const response = await sendMovies('basic-thomas', 'sR-_pcoow-27-6PAwCD8');
    expect(response.status).toBe(403);
    await connection.reset();
    done();
  });

  it("Put more then 5 movies for premium user", async (done) => {
    const response = await sendMovies('premium-jim', 'GBLtTyq3E_UNjFnpo9m6');
    expect(response.status).toBe(200);
    await connection.reset();
    done();
  });
});
