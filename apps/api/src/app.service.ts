import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getRoot() {
    return {
      success: true,
      name: "vk-portfolio-api",
      message: "NestJS API is running",
    };
  }

  getHealth() {
    return {
      status: "OK",
      timestamp: new Date().toISOString(),
    };
  }
}
