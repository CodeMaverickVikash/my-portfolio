import { API_PREFIX } from "@repo/shared";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import express, { type Express } from "express";
import "reflect-metadata";
import type { VercelRequest, VercelResponse } from "@vercel/node";

import { AppModule } from "../src/app.module";

let cachedServer: Express | null = null;

async function createServer() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  const allowedOrigins = process.env.CORS_ORIGIN?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.enableCors({
    origin: allowedOrigins?.length ? allowedOrigins : true,
  });

  app.setGlobalPrefix(API_PREFIX);
  await app.init();

  return server;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  cachedServer ??= await createServer();
  return cachedServer(req, res);
}
