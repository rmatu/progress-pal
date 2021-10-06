require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import fs from "fs";
import https from "https";
import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { COOKIE_NAME, __prod__ } from "./constants";
import { oAuth2Client } from "./OAuth2Client";
import { redis } from "./redis";

//Entities
import { User } from "./entities/User";
import { UserMetrics } from "./entities/UserMetrics";
import { Muscle } from "./entities/Muscle";
import { Exercise } from "./entities/Exercise";
import { ExerciseSet } from "./entities/ExerciseSet";
import { Workout } from "./entities/Workout";

//Resolvers
import { UserResolver } from "./resolvers/user";
import { UserMetricsResolver } from "./resolvers/userMetrics";
import { WorkoutResolver } from "./resolvers/workout";

const main = async () => {
  oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

  const conn = await createConnection({
    type: "postgres",
    database: process.env.DB_DATABASE_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [User, UserMetrics, Workout, Exercise, ExerciseSet, Muscle],
  });

  // await conn.runMigrations();

  const app = express();

  const sslServer = https.createServer(
    {
      key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
      cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
    },
    app,
  );

  const RedisStore = connectRedis(session);

  app.set("trust poxy", 1);
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    }),
  );
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__, // cookie only works in https
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET as string,
      resave: false,
    }),
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, UserMetricsResolver, WorkoutResolver],
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
    console.log("server started on http://localhost:4000/graphql");
  });
};

main().catch(err => {
  console.log(err);
});
