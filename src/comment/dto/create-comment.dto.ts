import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsUUID, Length } from "class-validator";

export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  @Length(1, 10000)
  content: string;

  @ApiProperty()
  @IsString()
  @IsUUID()
  authorId: string;

  @ApiProperty()
  @IsString()
  @IsUUID()
  articleId: string;

  @ApiProperty({
    nullable: true,
    required: false
  })
  @IsString()
  @IsUUID()
  @IsOptional()
  parentCommentId: string;
}
