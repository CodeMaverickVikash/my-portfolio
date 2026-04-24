import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import type { Express } from "express";

import { AppModule } from "./app.module";

type CorsCallback = (error: Error | null, allow?: boolean) => void;

export async function createNestApplication(expressInstance?: Express) {
  const app = expressInstance
    ? await NestFactory.create(AppModule, new ExpressAdapter(expressInstance))
    : await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const clientUrl = configService.get<string>("clientUrl");
  const allowedOrigins = clientUrl
    ?.split(",")
    .map((origin) => origin.trim().replace(/\/+$/, ""))
    .filter(Boolean);

  app.enableCors({
    origin: (origin: string | undefined, callback: CorsCallback) => {
      if (!origin || !allowedOrigins?.length) {
        return callback(null, true);
      }

      const normalizedOrigin = origin.replace(/\/+$/, "");
      return allowedOrigins.includes(normalizedOrigin)
        ? callback(null, true)
        : callback(new Error("CORS policy: This origin is not allowed."));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  app.setGlobalPrefix("api");
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  await app.init();
  return app;
}
