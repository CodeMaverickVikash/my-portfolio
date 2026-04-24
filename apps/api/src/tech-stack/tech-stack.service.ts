import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";

import { PrismaService } from "../prisma/prisma.service";
import { CreateTechStackDto } from "./dto/create-tech-stack.dto";
import { QueryTechStackDto } from "./dto/query-tech-stack.dto";
import { UpdateTechStackDto } from "./dto/update-tech-stack.dto";

@Injectable()
export class TechStackService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(query: QueryTechStackDto) {
    const filters: Record<string, unknown> = {};

    if (query.category && query.category !== "All") {
      filters.category = query.category;
    }

    if (query.search) {
      filters.OR = [
        { name: { contains: query.search, mode: "insensitive" } },
        { description: { contains: query.search, mode: "insensitive" } },
      ];
    }

    if (query.isActive !== undefined) {
      filters.isActive = query.isActive;
    }

    const techStack = await this.prisma.techStack.findMany({
      where: filters,
      orderBy: { createdAt: "desc" },
    });

    return {
      success: true,
      count: techStack.length,
      data: techStack,
    };
  }

  async getById(id: string) {
    const techStack = await this.prisma.techStack.findUnique({
      where: { id },
    });

    if (!techStack) {
      throw new NotFoundException({
        success: false,
        message: "Tech stack item not found",
      });
    }

    return {
      success: true,
      data: techStack,
    };
  }

  async create(createTechStackDto: CreateTechStackDto) {
    try {
      const techStack = await this.prisma.techStack.create({
        data: {
          id: uuidv4(),
          ...(this.toPersistenceData(createTechStackDto) as any),
        },
      });

      return {
        success: true,
        message: "Tech stack item created successfully",
        data: techStack,
      };
    } catch (error) {
      if (this.isUniqueConstraintError(error)) {
        throw new BadRequestException({
          success: false,
          message: "A technology with this name already exists",
        });
      }

      throw error;
    }
  }

  async update(id: string, updateTechStackDto: UpdateTechStackDto) {
    try {
      const existing = await this.prisma.techStack.findUnique({
        where: { id },
      });

      if (!existing) {
        throw new NotFoundException({
          success: false,
          message: "Tech stack item not found",
        });
      }

      const techStack = await this.prisma.techStack.update({
        where: { id },
        data: this.toPersistenceData(updateTechStackDto) as any,
      });

      return {
        success: true,
        message: "Tech stack item updated successfully",
        data: techStack,
      };
    } catch (error) {
      if (this.isUniqueConstraintError(error)) {
        throw new BadRequestException({
          success: false,
          message: "A technology with this name already exists",
        });
      }

      throw error;
    }
  }

  async remove(id: string) {
    const techStack = await this.prisma.techStack.findUnique({
      where: { id },
    });

    if (!techStack) {
      throw new NotFoundException({
        success: false,
        message: "Tech stack item not found",
      });
    }

    await this.prisma.techStack.delete({
      where: { id },
    });

    return {
      success: true,
      message: "Tech stack item deleted successfully",
      data: techStack,
    };
  }

  async getStats() {
    const techStack = await this.prisma.techStack.findMany({
      select: { category: true },
    });
    const total = techStack.length;
    const byCategory = techStack.reduce(
      (acc: Record<string, number>, item: { category: string }) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
      },
      {},
    );

    return {
      success: true,
      data: {
        total,
        byCategory,
      },
    };
  }

  private toPersistenceData(
    techStackDto: Partial<CreateTechStackDto> | Partial<UpdateTechStackDto>,
  ) {
    const data: Record<string, unknown> = {};

    if (techStackDto.name !== undefined) data.name = techStackDto.name;
    if (techStackDto.description !== undefined) {
      data.description = techStackDto.description;
    }
    if (techStackDto.category !== undefined) data.category = techStackDto.category;
    if (techStackDto.year !== undefined) data.year = techStackDto.year;
    if (techStackDto.paradigm !== undefined) data.paradigm = techStackDto.paradigm;
    if (techStackDto.features !== undefined) data.features = techStackDto.features;
    if (techStackDto.useCases !== undefined) data.useCases = techStackDto.useCases;
    if (techStackDto.icon !== undefined) data.icon = techStackDto.icon;
    if (techStackDto.gradient !== undefined) data.gradient = techStackDto.gradient;
    if (techStackDto.difficulty !== undefined) {
      data.difficulty = techStackDto.difficulty;
    }
    if (techStackDto.topics !== undefined) {
      data.topics = techStackDto.topics as any;
    }
    if (techStackDto.resources !== undefined) {
      data.resources = techStackDto.resources as any;
    }
    if (techStackDto.isActive !== undefined) data.isActive = techStackDto.isActive;

    return data;
  }

  private isUniqueConstraintError(error: unknown) {
    return (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    );
  }
}
