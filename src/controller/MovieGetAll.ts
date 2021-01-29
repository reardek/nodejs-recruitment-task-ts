import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Movie } from "../entity/Movie";

export async function movieGetAll(request: Request, response: Response, next: NextFunction) {
  const movieRepository = getRepository(Movie);

  const movies = await movieRepository.find();

  return response.send(movies);
}
