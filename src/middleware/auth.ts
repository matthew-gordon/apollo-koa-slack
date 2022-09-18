import type Koa from 'koa';
import { getUserById } from '../db/queries/user';
import { verifyToken } from '../utils';

export default async (ctx: Koa.Context, next: Koa.Next) => {
  const accessToken = ctx.header['x-access-token'];

  if (!accessToken) {
    await next();
  }

  const [type, token] = (accessToken as string).split(' ');

  if (type === 'Bearer' && !!token) {
    try {
      const data = await verifyToken(token);
      const user = await getUserById(data.sub!);

      if (!user) await next();

      ctx.state.user = Object.assign({}, user, { password: null });
      await next();
    } catch {
      await next();
    }
  } else {
    await next();
  }
};
