import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import axios from "axios";
import { getRepository } from "typeorm";
import { Movie } from "../entity/Movie";
import { User } from "../entity/User";
import { JWT_SECRET, OMDB_API } from "../server";

export async function addMovie(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authorization = request.headers.authorization;
  if (!authorization)
    return response.status(401).json({ message: "Missing authorization" });
  if (!request.body || !request.body.title)
    return response.status(400).json({ message: "Missing movie title" });
  const authorizationToken = authorization.split(" ")[1];
  const movieTitle = request.body.title;

  try {
    if (!JWT_SECRET)
    new Error(
      "Missing JWT_SECRET env var. Set it and restart the server"
    );
  if (!OMDB_API)
    throw Error("Missing OMDB_API env var. Set it and restart the server");
  } catch(erorr) {
      next(erorr)
  }
  
  let jwtPayload;
  try {
    jwtPayload = await <any>jwt.verify(authorizationToken, JWT_SECRET);
  } catch (error) {
    return response.status(401).json(error);
  }

  const { userId } = jwtPayload;

  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ id: userId });
  if (user.moviesUploaded > 5 && user.role === "basic")
    return response.status(401).json({
      message: "You used all free uploads. Upgrade your accout to Premium.",
    });
  const findMovie = await axios.get(
    `https://www.omdbapi.com/?apikey=${OMDB_API}&t=${movieTitle}`
  );
  if (findMovie.data.Error) response.json(findMovie.data);

  const { Title, Released, Genre, Director } = findMovie.data;

  const movieRepository = getRepository(Movie);

  try {
    await movieRepository.insert({
      title: Title,
      released: Released,
      genre: Genre,
      directory: Director,
      user,
    });
    user.moviesUploaded++;
    await userRepository.save(user);
    return response.json({ message: "OK" });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY")
      return response
        .status(500)
        .json({ message: `${Title} is already in database` });
    else return response.status(500).json(error);
  }
}
