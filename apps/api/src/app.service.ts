import { API_NAME } from "@repo/shared";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getRoot() {
    return {
      name: API_NAME,
      message: "NestJS API is running",
    };
  }

  getHealth() {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
    };
  }
}
