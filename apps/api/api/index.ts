import express, { type Express } from "express";
import "reflect-metadata";
import type { VercelRequest, VercelResponse } from "@vercel/node";

import { createNestApplication } from "../src/bootstrap";

let cachedServer: Express | null = null;

async function createServer() {
  const server = express();
  await createNestApplication(server);
  return server;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  cachedServer ??= await createServer();
  return cachedServer(req, res);
}
