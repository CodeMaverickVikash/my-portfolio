import { Module } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { PrismaModule } from "../prisma/prisma.module";
import { TechStackController } from "./tech-stack.controller";
import { TechStackService } from "./tech-stack.service";

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [TechStackController],
  providers: [TechStackService],
})
export class TechStackModule {}
