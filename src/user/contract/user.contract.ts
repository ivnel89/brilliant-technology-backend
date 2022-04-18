import { User } from "../entities/user.entity";

export class UserContract {
    constructor(user: User){
        this.id = user.id;
        this.displayPicture = user.displayPicture;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
    }
    id: string
    firstName: string;
    lastName: string;
    displayPicture: string;
}