import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsUrl, Length } from "class-validator";

export class UpdateUserDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    @Length(1,256)
    firstName?: string;
  
    @ApiProperty()
    @IsString()
    @IsOptional()
    @Length(1,256)
    lastName?: string;
  
    @ApiProperty()
    @IsUrl()
    @IsOptional()
    @Length(1,2048)
    displayPicture?: string;

}
