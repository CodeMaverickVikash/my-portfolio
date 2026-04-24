import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import configuration from "./configuration";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { TechStackModule } from "./tech-stack/tech-stack.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    PrismaModule,
    AuthModule,
    TechStackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
