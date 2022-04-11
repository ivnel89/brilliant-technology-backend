import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsUrl, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @Length(1,256)
  firstName: string;

  @ApiProperty()
  @IsString()
  @Length(1,256)
  lastName: string;

  @ApiProperty()
  @IsUrl()
  @Length(1,2048)
  displayPicture: string;
}
