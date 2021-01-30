require("dotenv").config();
import "reflect-metadata";
import { UserResolver } from "./resolvers/user";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { __prod__ } from "./constants";
import express from "express";
import path from "path";
import session from "express-session";
import connectRedis from "connect-redis";
import { buildSchema } from "type-graphql";
import cors from "cors";
import { COOKIE_NAME } from "./constants";
import { oAuth2Client } from "./OAuth2Client";

//Entities
import { User } from "./entities/User";
import { redis } from "./redis";

const main = async () => {
  oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

  const conn = await createConnection({
    type: "postgres",
    database: "progresspal",
    username: "postgres",
    password: "adammalysz55",
    port: 5432,
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [User],
  });

  // await conn.runMigrations();

  const app = express();

  const RedisStore = connectRedis(session);

  app.set("trust poxy", 1);
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__, // cookie only works in https
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET as string,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
    }),
  });

  apolloServer.applyMiddleware({
    app,
    path: "/graphql",
    cors: { credentials: true, origin: process.env.CORS_ORIGIN },
  });

  app.listen(parseInt(process.env.PORT as string), () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.log(err);
});
