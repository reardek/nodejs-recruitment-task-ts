import { createConnection, getConnection } from "typeorm";
import { User } from "../entity/User";
import { IUser } from "../interfaces";
import server from "../server";
import supertest from "supertest";

export const request = supertest(server);

const connection = {
  async create() {
    await createConnection();
    const connection = getConnection();
    await connection.synchronize();
    const userRepository = connection.getRepository(User);
    const users: IUser[] = [
      {
        id: 123,
        role: "basic",
        name: "Basic Thomas",
        username: "basic-thomas",
        password: "sR-_pcoow-27-6PAwCD8",
        moviesUploaded: 0,
      },
      {
        id: 434,
        role: "premium",
        name: "Premium Jim",
        username: "premium-jim",
        password: "GBLtTyq3E_UNjFnpo9m6",
        moviesUploaded: 0,
      },
    ];
    await userRepository.insert(users);
  },

  async close() {
    await getConnection().close();
  },

  async reset() {
    const connection = getConnection();
    await connection.query("DROP TABLE movie;")
    await connection.synchronize();
  },
};
export default connection;
