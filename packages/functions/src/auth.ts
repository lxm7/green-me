import {
  Session,
  AuthHandler,
  GoogleAdapter,
  FacebookAdapter,
} from "sst/node/auth";
import { Config } from "sst/node/config";
import { Table } from "sst/node/table";
import { NextjsSite } from "sst/node/site";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

declare module "sst/node/auth" {
  export interface SessionTypes {
    user: {
      userID: string;
    };
  }
}

export const handler = AuthHandler({
  providers: {
    google: GoogleAdapter({
      mode: "oidc",
      clientID: Config.GOOGLE_CLIENT_ID,
      onSuccess: async (tokenset) => {
        const claims = tokenset.claims();
        const ddb = new DynamoDBClient({});
        await ddb.send(
          new PutItemCommand({
            TableName: Table.users.tableName,
            Item: marshall({
              userId: claims.sub,
              email: claims.email,
              // picture: claims.picture,
              name: claims.given_name,
            }),
          })
        );

        return Session.parameter({
          redirect: process.env.IS_LOCAL
            ? "http://localhost:3000"
            : NextjsSite.site.url,
          type: "user",
          properties: {
            userID: claims.sub,
          },
        });
      },
    }),
    facebook: FacebookAdapter({
      clientID: Config.FACEBOOK_APP_ID,
      clientSecret: Config.FACEBOOK_APP_SECRET,
      scope: "openid email",
      onSuccess: async (tokenset) => {
        const claims = tokenset.claims();
        const ddb = new DynamoDBClient({});

        await ddb.send(
          new PutItemCommand({
            TableName: Table.users.tableName,
            Item: marshall({
              userId: claims.sub,
              email: claims.email,
              picture: claims.picture,
              name: claims.given_name,
            }),
          })
        );
        return Session.parameter({
          redirect: process.env.IS_LOCAL
            ? "http://localhost:3000"
            : NextjsSite.site.url,
          type: "user",
          properties: {
            userID: claims.sub,
          },
        });
      },
    }),
  },
});
