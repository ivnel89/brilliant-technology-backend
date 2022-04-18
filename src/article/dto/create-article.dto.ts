import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";

export class CreateArticleDto {
    @ApiProperty()
    @IsString()
    content: string;
  
    @ApiProperty()
    @IsString()
    @IsUUID()
    authorId: string;
}
