import { Controller, Get } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getRoot() {
    return this.appService.getRoot();
  }

  @Get("health")
  getHealth() {
    return this.appService.getHealth();
  }

  @Get("check-env")
  getEnvironmentCheck() {
    return {
      PORT: this.configService.get<number>("port"),
      NODE_ENV: this.configService.get<string>("nodeEnv"),
      CLIENT_URL: this.configService.get<string>("clientUrl"),
      JWT_ACCESS_TOKEN_EXPIRE: this.configService.get<string>(
        "jwtAccessTokenExpire",
      ),
      DATABASE_URL: this.configService.get<string>("databaseUrl")
        ? "***SET***"
        : "***NOT SET***",
      JWT_SECRET: this.configService.get<string>("jwtSecret")
        ? "***SET***"
        : "***NOT SET***",
    };
  }
}
