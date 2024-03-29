require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import fs from "fs";
import https from "https";
import cors from "cors";
import express from "express";
import session from "express-session";
import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { COOKIE_NAME, __prod__ } from "./constants";
import { oAuth2Client } from "./OAuth2Client";
import { redis } from "./redis";

//Entities
import { CommonExercise } from "./entities/CommonExercise";
import { ExerciseSet } from "./entities/ExerciseSet";
import { User } from "./entities/User";
import { UserExercise } from "./entities/UserExercise";
import { UserMetrics } from "./entities/UserMetrics";
import { Workout } from "./entities/Workout";
import { WorkoutExercise } from "./entities/WorkoutExercise";

//Resolvers
import { UserResolver } from "./resolvers/user";
import { UserMetricsResolver } from "./resolvers/userMetrics/userMetricsResolver";
import { WorkoutResolver } from "./resolvers/workout/workoutResolver";
import { WorkoutExerciseResolver } from "./resolvers/WorkoutExercise/WorkoutExerciseResolver";
import { UserExerciseResolver } from "./resolvers/UserExercise/userExerciseResolver";
import { CommonExerciseResolver } from "./resolvers/commonExercise";

const main = async () => {
  oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

  await createConnection({
    type: "postgres",
    database: process.env.DB_DATABASE_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [
      CommonExercise,
      ExerciseSet,
      User,
      UserExercise,
      UserMetrics,
      Workout,
      WorkoutExercise,
    ],
  });

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
        sameSite: "lax",
        secure: __prod__,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET as string,
      resave: false,
    }),
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        CommonExerciseResolver,
        UserMetricsResolver,
        UserResolver,
        UserExerciseResolver,
        WorkoutResolver,
        WorkoutExerciseResolver,
      ],
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

  sslServer.listen(parseInt(process.env.PORT as string), () => {
    console.log(`Server started on ${process.env.PORT} port`);
  });
};

main().catch(err => {
  console.log(err);
});
