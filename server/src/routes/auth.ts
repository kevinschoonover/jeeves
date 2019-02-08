import * as Koa from "koa";
import { config } from "../config";
import { isAuthenticated } from "../lib/auth";

import * as passport from "koa-passport";
import * as Router from "koa-router";

const router = new Router();

router.get("/logout/", async (ctx: Koa.ParameterizedContext, next: any) => {
  ctx.logout();
  ctx.redirect("/");
});

export { router };
