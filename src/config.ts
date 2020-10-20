// Mapper for environment variables
export const environment = process.env.NODE_ENV;
export const port = process.env.PORT;

export const db = {
  devUrl: process.env.DB_DEV,
  prodUrl: process.env.DB_PROD,
  firebaseConfig: process.env.FIREBASE_CONFIG_BASE64,
};

export const corsUrl = process.env.CORS_URL;

export const tokenInfo = {
  accessTokenValidityDays: parseInt(process.env.ACCESS_TOKEN_VALIDITY_DAYS),
  refreshTokenValidityDays: parseInt(process.env.REFRESH_TOKEN_VALIDITY_DAYS),
  issuer: process.env.TOKEN_ISSUER,
  audience: process.env.TOKEN_AUDIENCE,
};

export const logDirectory = process.env.LOG_DIR;
