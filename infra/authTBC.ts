import {
  GOOGLE_CLIENT_ID,
  FACEBOOK_APP_SECRET,
  FACEBOOK_APP_ID,
} from "./storage";
import { web } from "./frontend";

export const auth = new sst.aws.Auth("auth", {
  authenticator: {
    handler: "packages/functions/src/auth.handler",
    // @ts-expect-error wait for Auth from SST to be completed
    bind: [web.url, GOOGLE_CLIENT_ID, FACEBOOK_APP_SECRET, FACEBOOK_APP_ID],
  },
});

// auth.attach(stack, {
//   api,
//   prefix: "/auth",
// });
