import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString, IsUUID } from "class-validator";

export class GetCommentsDto {
  @ApiProperty({
    nullable: true,
    required: false
  })
  @IsString()
  @IsUUID()
  @IsOptional()
  userId?: string;

  @ApiProperty({
     isArray: true,
    nullable: true,
required: false
  })
  @IsArray()
  @IsOptional()
  commentIds?: Array<string>;

  @ApiProperty({
    nullable: true,
    required: false
  })
  @IsString()
  @IsUUID()
  @IsOptional()
  articleId?: string;
}
