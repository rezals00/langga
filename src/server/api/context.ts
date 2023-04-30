import * as trpc from '@trpc/server';
import { inferAsyncReturnType } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import jwt from 'jsonwebtoken';
interface JWT {

}
async function decodeAndVerifyJwtToken(token: string) {
    const secret = process.env.JWT_SECRET;
  
    if (!secret) {
      throw new Error('JWT_SECRET environment variable not set');
    }
  
    try {
      const decoded = await jwt.verify(token, secret) as JWTUserPayload;
      return decoded;
    } catch (err) {
      console.error('Invalid token:', err);
      return null;
    }
  }
export async function createContext({
  req,
  res,
}: trpcNext.CreateNextContextOptions) {
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers

  // This is just an example of something you might want to do in your ctx fn
  async function getUserFromHeader() {
    if (req.headers.authorization && req.headers.authorization.split(' ').length > 0) {
      let token = req.headers.authorization.split(' ')!
      const user = await decodeAndVerifyJwtToken(token[1] as string)
      return user;
    }
    return null;
  }
  const user = await getUserFromHeader();

  return {
    user
  };
}
export type Context = inferAsyncReturnType<typeof createContext>;