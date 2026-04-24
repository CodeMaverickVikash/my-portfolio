import { IsIn, IsString } from "class-validator";

export class ResourceDto {
  @IsString()
  title!: string;

  @IsString()
  url!: string;

  @IsString()
  @IsIn(["Official", "Tutorial", "Documentation", "Video", "Article"])
  type!: string;
}
