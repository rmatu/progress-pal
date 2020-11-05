import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express"
import { __prod__ } from "./constants";
import express from "express";
import path from "path";
import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";

//Entities
import { User } from "./entities/User";


const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    database: "progresspal",
    username: "postgres",
    password: "adammalysz55",
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [User]
  })

  await conn.runMigrations();

  const app = express();

  const RedisStore = connectRedis(session)
  const redis = new Redis()

  app.use(
    session({
      name: "qid",
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
      secret: "pfokasfadlveqttauytsdltksmv",
      resave: false,
    })

  )
  const apolloServer = new ApolloServer({
    context: ({ req, res }) => ({
      req,
      res,
      redis,
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log('server started on localhost:4000')
  })
}

main().catch((err) => {
  console.log(err)
})