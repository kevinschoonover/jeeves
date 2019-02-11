import * as Koa from "koa";

import * as Router from "koa-router";

const router = new Router();

router.get("/logout/", async (ctx: Koa.ParameterizedContext, next: any) => {
  ctx.logout();
  ctx.redirect("/");
});

export { router };
