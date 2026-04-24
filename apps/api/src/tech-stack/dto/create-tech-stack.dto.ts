import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsIn,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

import { ResourceDto } from "./resource.dto";
import { TopicDto } from "./topic.dto";

export class CreateTechStackDto {
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsString()
  @IsIn(["Frontend", "Backend", "Database", "Framework", "Tools"])
  category!: string;

  @IsString()
  year!: string;

  @IsString()
  paradigm!: string;

  @IsArray()
  @IsString({ each: true })
  features!: string[];

  @IsArray()
  @IsString({ each: true })
  useCases!: string[];

  @IsString()
  icon!: string;

  @IsString()
  gradient!: string;

  @IsString()
  @IsIn(["Beginner", "Intermediate", "Advanced"])
  difficulty!: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TopicDto)
  topics?: TopicDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResourceDto)
  resources?: ResourceDto[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
