import { v4 } from "uuid";
import { redis } from "../redis";

export const createConfirmationUrl = async (userId: number) => {
  const token = v4();
  await redis.set(token, userId, "ex", 60 * 30); // 30min expiration

  return `http://localhost:3000/confirm/${token}`;
};
