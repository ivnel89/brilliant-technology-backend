import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsUUID } from "class-validator";

export class FindOneArticleDto {
    @IsOptional()
    @ApiProperty({
      required: false
    })
    @IsUUID()
    requesterId?: string;
  }
  