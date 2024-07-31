import { NextApiRequest } from 'next';

export interface NextAuthRequest extends NextApiRequest {
  user?: string;
}
