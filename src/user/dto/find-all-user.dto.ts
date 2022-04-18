import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, Max } from "class-validator";

export class FindAllUserDto {
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
  }
  