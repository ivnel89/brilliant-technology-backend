import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID, Length } from "class-validator";

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
}
