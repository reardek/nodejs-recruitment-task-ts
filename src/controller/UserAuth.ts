import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Movie } from "../entity/Movie";
import { auth, AuthError } from "../auth";
import { JWT_SECRET } from "../server";

export async function userAuth(
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (!request.body) {
    return response.status(400).json({ error: "invalid payload no body" });
  }

  const { username, password } = request.body;

  if (!username || !password) {
    return response.status(400).json({ error: "invalid payload" });
  }

  if (!JWT_SECRET)
    throw new Error(
      "Missing JWT_SECRET env var. Set it and restart the server"
    );

  try {
    const token = await auth({ username, password }, JWT_SECRET);

    return response.status(200).json({ token });
  } catch (error) {
    if (error instanceof AuthError) {
      return response.status(401).json({ error: error.message });
    }
    next(error);
  }
}
