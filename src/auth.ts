import jwt from "jsonwebtoken";
import { IUserCredential } from "./interfaces";
class AuthError extends Error {}

const users = [
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

const authFactory = (secret: string) => (
  userCredential: IUserCredential
): string => {
  const user = users.find((u) => u.username === userCredential.username);

  if (!user || user.password !== userCredential.password) {
    throw new AuthError("invalid username or password");
  }

  return jwt.sign(
    {
      userId: user.id,
      name: user.name,
      role: user.role,
    },
    secret,
    {
      issuer: "https://www.netguru.com/",
      subject: `${user.id}`,
      expiresIn: 30 * 60,
    }
  );
};

export { authFactory, AuthError };
