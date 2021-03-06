import express, { Errback, NextFunction, Request, Response } from "express";
import { createConnection } from "typeorm";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import "reflect-metadata";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
import { movieGetAll } from "./controller/MovieGetAll";
import { addMovie } from "./controller/AddMovie";
import { userAuth } from "./controller/UserAuth";
import { userGetAll } from "./controller/UserGetAll";
import { User } from "./entity/User";
import { IUser } from "./interfaces";

const app = express();
dotenv.config();
const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV !== 'test') {
  createConnection({
    type: "mariadb",
    host: "localhost",
    port: 3306,
    username: "root",
    password: `${process.env.MARIADB_PASSWORD}`,
    database: "OMDB",
    entities: [__dirname + "/entity/*.ts"],
  }).then(async (connetion) => {
    const userRepository = connetion.getRepository(User);
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
  
    await connetion.dropDatabase();
    await connetion.synchronize();
    await userRepository.insert(users);
  });
}
export const { JWT_SECRET, OMDB_API } = process.env;

app.use(bodyParser.json());
app.use((error: Errback, req: Request, res: Response, next: NextFunction) => {
  console.error(
    `Error processing request ${error}. See next message for details`
  );
  console.error(error);
  return res.status(500).json({ error: "internal server error" });
});

app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(YAML.load("./swagger.yml"))
);

app.post("/auth", userAuth);
app.get("/users", userGetAll);
app.get("/movies", movieGetAll);
app.post("/movie", addMovie);

const PORT = process.env.NODE_ENV === 'test' ? 0 : 3000

const server = app.listen(PORT);

export default server;