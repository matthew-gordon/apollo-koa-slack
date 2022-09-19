import type Koa from 'koa';
import { getUserById } from '../db/queries/user';
import { verifyToken } from '../utils';

export default async (ctx: Koa.Context, next: Koa.Next) => {
  const accessToken = ctx.header['x-access-token'];

  if (!accessToken) {
    await next();
  } else if (
    !!accessToken &&
    (accessToken as string).split(' ')[0] === 'Bearer'
  ) {
    const [, token] = (accessToken as string).split(' ');

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
