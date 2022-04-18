import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";

export class UpVoteCommentDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  userId: string;
}
