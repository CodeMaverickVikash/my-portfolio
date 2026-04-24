import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";

import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CreateTechStackDto } from "./dto/create-tech-stack.dto";
import { QueryTechStackDto } from "./dto/query-tech-stack.dto";
import { UpdateTechStackDto } from "./dto/update-tech-stack.dto";
import { TechStackService } from "./tech-stack.service";

@Controller("tech-stack")
export class TechStackController {
  constructor(private readonly techStackService: TechStackService) {}

  @Get()
  getAll(@Query() query: QueryTechStackDto) {
    return this.techStackService.getAll(query);
  }

  @Get("stats")
  getStats() {
    return this.techStackService.getStats();
  }

  @Get(":id")
  getById(@Param("id") id: string) {
    return this.techStackService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTechStackDto: CreateTechStackDto) {
    return this.techStackService.create(createTechStackDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() updateTechStackDto: UpdateTechStackDto,
  ) {
    return this.techStackService.update(id, updateTechStackDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.techStackService.remove(id);
  }
}
