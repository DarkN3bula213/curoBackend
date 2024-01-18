import * as dotenv from 'dotenv';
import * as path from 'path';

import {
  getDecodedOsEnv,
  getOsEnv,
  getOsEnvOptional,
  normalizePort,
  toNumber,
} from './lib/env';

/**
 * Load .env file or for tests the .env.test file.
 */
dotenv.config({
  path: path.join(
    process.cwd(),
    `.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`,
  ),
});

/**
 * Environment variables
 */
export const env = {
  node: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  isDevelopment: process.env.NODE_ENV === 'development',
  app: {
    // name: getOsEnv("APP_NAME"),
    // host: getOsEnv("APP_HOST"),
    // schema: getOsEnv("APP_SCHEMA"),
    // routePrefix: getOsEnv("APP_ROUTE_PREFIX"),
    port: normalizePort(process.env.PORT || getOsEnv('APP_PORT')),
    // banner: toBool(getOsEnv("APP_BANNER")),
  },
  cors: {
    url: getOsEnv('CORS_URL'),
  },
  log: {
    // level: getOsEnv("LOG_LEVEL"),
    // output: getOsEnv("LOG_OUTPUT"),
  },
  db: {
    name: getOsEnvOptional('DB_NAME'),
    host: getOsEnvOptional('DB_HOST'),
    port: toNumber(getOsEnv('DB_PORT')),
    user: getOsEnvOptional('DB_USER'),
    password: getOsEnvOptional('DB_USER_PWD'),
    prod: getOsEnvOptional('PRODUCTION'),
    dev: getOsEnv('MONGO_URI'),
    admin: getOsEnvOptional('DB_ADMIN'),
    // type: getOsEnv("TYPEORM_CONNECTION"),
    // host: getOsEnvOptional("TYPEORM_HOST"),

    // username: getOsEnvOptional("TYPEORM_USERNAME"),
    // password: getOsEnvOptional("TYPEORM_PASSWORD"),
    // database: getOsEnv("TYPEORM_DATABASE"),

    // logging: toBool(getOsEnv("TYPEORM_LOGGING")),
  },
  mongo: {
    uri: getOsEnv('MONGO_URI'),
    // route: getOsEnv("GRAPHQL_ROUTE"),
    // editor: toBool(getOsEnv("GRAPHQL_EDITOR")),
  },
  redis: {
    uri: getOsEnv('REDIS_URI'),
    host: getOsEnvOptional('REDIS_HOST'),
    port: toNumber(getOsEnv('REDIS_PORT')),
    password: getOsEnvOptional('REDIS_PASSWORD'),
    upstash: getOsEnvOptional('UPSTASH_URL'),
  },
  token: {
    public: {
      access: getDecodedOsEnv('ACCESS_TOKEN_PUBLIC_KEY'),
      refresh: getDecodedOsEnv('REFRESH_TOKEN_PUBLIC_KEY'),
    },
    private: {
      access: getDecodedOsEnv('ACCESS_TOKEN_PRIVATE_KEY'),
      refresh: getDecodedOsEnv('REFRESH_TOKEN_PRIVATE_KEY'),
    },
    access: {
      private: getDecodedOsEnv('ACCESS_TOKEN_PRIVATE_KEY'),
      public: getDecodedOsEnv('ACCESS_TOKEN_PUBLIC_KEY'),
      // public: getOsEnv("ACCESS_TOKEN_PUBLIC_KEY"),
      // private: getOsEnv("ACCESS_TOKEN_PRIVATE_KEY"),
      // expiration: getOsEnv("ACCESS_TOKEN_EXPIRATION"),
    },
    refresh: {
      private: getDecodedOsEnv('REFRESH_TOKEN_PRIVATE_KEY'),
      public: getDecodedOsEnv('REFRESH_TOKEN_PUBLIC_KEY'),
      // public: getOsEnv("REFRESH_TOKEN_PUBLIC_KEY"),
      // private: getOsEnv("REFRESH_TOKEN_PRIVATE_KEY"),
      // expiration: getOsEnv("REFRESH_TOKEN_EXPIRATION"),
    },
  },
};
