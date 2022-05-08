import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString, IsUUID } from "class-validator";

export class GetCommentsDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  userId: string;

  @ApiProperty({
     isArray: true
  })
  @IsArray()
  commentIds: Array<string>;
}
