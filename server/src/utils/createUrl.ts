import { v4 } from "uuid";
import { redis } from "../redis";

export const createUrl = async (userId: number, route: string) => {
  const token = v4();
  await redis.set(token, userId, "ex", 60 * 10); // 10min expiration

  return `http://localhost:3000/${route}/${token}`;
};
