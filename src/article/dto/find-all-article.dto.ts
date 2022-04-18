import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, Max } from "class-validator";

export class FindAllArticleDto {
    @IsOptional()
    @IsNumber()
    @ApiProperty()
    offset?: number;

    @IsOptional()
    @IsNumber()
    @Max(250)
    @ApiProperty()
    limit?: number;
  }
  