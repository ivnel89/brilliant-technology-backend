import { UserContract } from "../contract/user.contract";
import { User } from "../entities/user.entity"

export class UserContractMapper {
  build(user: User): UserContract {
    return new UserContract(user);
  }
  buildArray(users: Array<User>): Array<UserContract> {
    return users.map((user) => this.build(user));
  }
}