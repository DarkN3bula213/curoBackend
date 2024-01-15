import { promisify } from "util";
import User,{ UserDocument} from "../../core/modules/auth/users/user.model";
import { AuthFailureError } from "../api";
import path from "path";
import { readFile } from "fs";
import jwt,{sign,verify} from "jsonwebtoken";
import  {env}  from "../../env";
import { Logger as log} from "../logger/logger";
const Logger = new log(__filename);
export const getAccessToken = (authorization?: string) => {
  if (!authorization) throw new AuthFailureError("Invalid Authorization");
  if (!authorization.startsWith("Bearer "))
    throw new AuthFailureError("Invalid Authorization");
  return authorization.split(" ")[1];
};


export const createTokens = async (user: UserDocument) => {
  const accessToken = await generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user);
  return { accessToken, refreshToken };

};

export const generateAccessToken = async (user: UserDocument) => {
  const accessToken =  sign(user, await readPrivateKey(), {     
    expiresIn: "1h",
    algorithm: "RS256",
  });
  return accessToken;
};
export const generateRefreshToken = async (user: UserDocument) => {
  const refreshToken = sign(user, await readPrivateKey(), {
    expiresIn: "1y",
    algorithm: "RS256",
  });
  return refreshToken;

}
async function readPublicKey(): Promise<string> {
  return promisify(readFile)(
    path.join(__dirname, "../../keys/public.pem"),
    "utf8"
  );
}
async function readPrivateKey(): Promise<string> {
  return promisify(readFile)(
    path.join(__dirname, "../../keys/private.pem"),
    "utf8"
  );
}

export async function decodeToken(token: string): Promise<UserDocument> {
  const publicKey = await readPublicKey();
  return jwt.verify(token, publicKey) as UserDocument;
}

export async function encodeToken(user: UserDocument): Promise<string> {
  const privateKey = await readPrivateKey();
  return jwt.sign(user.toJSON(), privateKey, { algorithm: "RS256" });
}




const privateKey = env.token.access.private;
const publicKey = env.token.access.public;

export function signToken(
  object:  object,
  keyName: "access" | "refresh",
  options?: jwt.SignOptions | undefined
) {
  const signingKey =  env.token[keyName].private;

  return jwt.sign(object, signingKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyToken(token: string, keyName: "access" | "refresh") {
  const publicKey = env.token[keyName].public;

  try {
    const decoded = jwt.verify(token, publicKey);
Logger.info(JSON.stringify(decoded));
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    console.error(e);
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}
