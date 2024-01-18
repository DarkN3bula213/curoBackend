import { toMillis } from '@lib/functions/toMillis';
import { CookieOptions } from 'express';
import { env } from 'src/env';

export const enum Header {
  API_KEY = 'x-api-key',
  AUTHORIZATION = 'authorization',
}
export enum ValidationSource {
  BODY = 'body',
  HEADER = 'headers',
  QUERY = 'query',
  PARAM = 'params',
}

export const accessCookie: CookieOptions = {
  httpOnly: true,
  // signed: true,
  secure: env.isProduction ? true : false,
  sameSite: true,
  maxAge: toMillis('5m'),
};

export const refreshCookie: CookieOptions = {
  httpOnly: true,
  // signed: true,
  secure: env.isProduction ? true : false,
  sameSite: true,
  maxAge: toMillis('2h'),
};


export function Cookie(
  type: 'access' | 'refresh',
){
  return type === 'access' ? accessCookie : refreshCookie;
}