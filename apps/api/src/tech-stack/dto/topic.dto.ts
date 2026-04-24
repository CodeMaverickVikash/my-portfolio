import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class TopicDto {
  @IsNumber()
  id!: number;

  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsArray()
  @IsString({ each: true })
  subtopics!: string[];

  @IsOptional()
  @IsBoolean()
  isIntro?: boolean;
}
