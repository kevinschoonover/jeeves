// Basic Routes
import * as Koa from 'koa';
import * as Router from 'koa-router';
import { spec } from '../app';
const router = new Router();

/**
 * Base route, return a 401
 */
router.get('', async (ctx: Koa.ParameterizedContext) => {
  console.log(spec);
  ctx.body = JSON.stringify(spec, null, 2);
  ctx.status = 200;
});

/**
 * Basic healthcheck
 */
router.get('healthcheck/', async (ctx: Koa.ParameterizedContext) => {
  ctx.body = 'OK';
  ctx.status = 200;
});

export { router };
