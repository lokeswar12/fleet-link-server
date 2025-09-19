import dotenv from "dotenv";

dotenv.config();

export const mongoUrl = {
  MONGO_URL: process.env.MONGO_URL,
};

export const SERVER_CONFIG = {
  PORT: 8080,
  HOST: "0.0.0.0",
};
