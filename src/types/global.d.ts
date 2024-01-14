declare module "express-pdf";

declare module "*.json" {
  const value: any;
  export const type: any;
  export const project_id: any;
  export const privateKeyId: any;
  export const private_key_id: any;
  export const private_key: any;
  export const client_email: any;
  export const client_id: any;
  export const auth_uri: any;
  export const token_uri: any;
  export const auth_provider_x509_cert_url: any;
  export const client_x509_cert_url: any;
  export default value;
}



 
import { Request } from "express";

import Keystore from "../database/model/Keystore";
import ApiKey from "../core/modules/auth/apiKey/apiKey.model"; 
export default interface User {
  _id: Types.ObjectId;
  name?: string;
  profilePicUrl?: string;
  email?: string;
  password?: string;
  roles: Role[];
  verified?: boolean;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

declare interface PublicRequest extends Request {
  apiKey: ApiKey;
}

declare interface RoleRequest extends PublicRequest {
  currentRoleCodes: string[];
}

declare interface ProtectedRequest extends RoleRequest {
  user: User;
  accessToken: string;
  keystore: Keystore;
}

declare interface Tokens {
  accessToken: string;
  refreshToken: string;
}
