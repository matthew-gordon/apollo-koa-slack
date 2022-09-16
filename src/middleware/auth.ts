import type Koa from 'koa';
import { getSingleUserById } from '../db/queries/user';
import { verifyToken } from '../utils';

export default async (ctx: Koa.Context, next: Koa.Next) => {
  const accessToken = ctx.header['x-access-token'];

  if (!accessToken) {
    await next();
  } else {
    const [type, token] = accessToken;

    try {
      const data = await verifyToken(token);
      const user = await getSingleUserById(data.sub!);

      if (!user) {
        await next();
      }

      ctx.state.user = Object.assign({}, user, { password: null });
    } catch (err) {
      await next();
    }
  }

  await next();
};
