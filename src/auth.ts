import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { IUserCredential } from "./interfaces";
import { User } from "./entity/User";

class AuthError extends Error {}

const auth = async (
  userCredential: IUserCredential,
  secret: string
): Promise<string> => {
  const userRepository = getRepository(User)
  const user = await userRepository.findOne({username: userCredential.username});
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

export { auth, AuthError };
