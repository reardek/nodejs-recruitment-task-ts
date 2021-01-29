import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

export async function userGetAll(request: Request, response: Response, next: NextFunction) {
  const userRepository = getRepository(User);

  const users = await userRepository.find();

  return response.json(users);
}
