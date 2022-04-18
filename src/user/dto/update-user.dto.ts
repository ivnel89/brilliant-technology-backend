import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsUrl, Length } from "class-validator";

export class UpdateUserDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    @Length(1,256)
    firstName?: string;
  
    @ApiProperty({
        required: false
      })
    @IsString()
    @IsOptional()
    @Length(1,256)
    lastName?: string;
  
    @ApiProperty({
        required: false
      })
    @IsUrl()
    @IsOptional()
    @Length(1,2048)
    displayPicture?: string;

}
