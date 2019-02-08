import * as passport from "koa-passport";

import { Strategy as BearerStrategy } from "passport-http-bearer";

import { config } from "../config";
import { Account } from "../entity/Account";

passport.serializeUser((user: Account, done: any) => {
  done(undefined, user.id);
});

passport.deserializeUser(async (userID: string, done: any) => {
  const user = await Account.findOne({id: userID});
  if (user) {
    done(undefined, user);
  } else {
    done(undefined, false);
  }
});

export { passport };
