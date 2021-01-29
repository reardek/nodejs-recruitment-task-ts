import { Request } from "express";

export interface IUserCredential {
  username: string;
  password: string;
}

export interface BodyRequest<T> extends Request {
  body: T;
}

export interface IUser extends IUserCredential {
  id: number;
  name: string;
  role: string;
  moviesUploaded: number;
}

export interface ResponseError extends Error {
  status: number;
}
