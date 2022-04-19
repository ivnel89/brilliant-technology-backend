import { CreateUserDto } from "../dto/create-user.dto";
import { FindAllUserDto } from "../dto/find-all-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";

const createUserDto = new CreateUserDto();
createUserDto.displayPicture = "www.example.com/image.png";
createUserDto.firstName = "Foo";
createUserDto.lastName = "Bar";

const findAllUserDto = new FindAllUserDto();
findAllUserDto.limit = 50;
findAllUserDto.offset = 10;

const mockUserId = "mockUserId";
const updateUserDto = new UpdateUserDto();
updateUserDto.lastName = "Far";

export{
    createUserDto,
    findAllUserDto,
    mockUserId,
    updateUserDto
}