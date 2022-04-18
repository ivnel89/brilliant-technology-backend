import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsUUID, Max } from "class-validator";

export class FindAllArticleDto {
    @IsOptional()
    @IsNumber()
    @ApiProperty({
      required: false
    })
    offset?: number;

    @IsOptional()
    @IsNumber()
    @Max(250)
    @ApiProperty({
      required: false
    })
    limit?: number;

    @IsOptional()
    @ApiProperty({
      required: false
    })
    @IsUUID()
    requesterId?: string;
  }
  