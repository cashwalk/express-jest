import UserRepo from "../repositories/UserRepo";
import {User} from "../domains/users";

export const USERNAME_LENGTH = 16;
export const PASSWORD_LENGTH = 30;

export default class UserService {
  repo: UserRepo;
  
  constructor(repo: UserRepo) {
    this.repo = repo;
  }
  
  createUser = async (user: User): Promise<User> => {
    this.validateUsername(user.username);
    this.validatePassword(user.password);
    return await this.repo.insertUser(user);
  }
  signin = async function basicSignin(user: User): Promise<Boolean> {
    const foundUser = await this.repo.findUserByUsername(user.username);
    return Boolean(foundUser) && foundUser.password === user.password;
  }
  
  private validateUsername = function validateUsrnm(username: string): void {
    this.isHavingSpecialChar(username);
    this.isNotTooLong(username, USERNAME_LENGTH);
  }
  
  private validatePassword(password: string): void {
    this.isNotTooLong(password, PASSWORD_LENGTH);
  }
  
  private isHavingSpecialChar(str: string): void {
    if(str.match(RegExp(/^[A-Z]+$/))){ //
      throw Error('Upper case is not allowed');
    } else if(!str.match(RegExp(/^[A-Za-z0-9]+$/))){ //
      throw Error('Username has special characters');
    }
  }
  private isNotTooLong(str: string, limit : number = 16): void {
    if(str.length > limit) {
      throw Error('Too Long String')
    }
  }
  
}