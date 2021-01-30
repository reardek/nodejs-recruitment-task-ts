import express, { Errback, NextFunction, Request, Response } from "express";
import { createConnection, Connection } from "typeorm";
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
const PORT = 3000;
dotenv.config();

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

const server = app.listen(PORT)

export default server;