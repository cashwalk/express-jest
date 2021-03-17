import {User} from "../models/users";
import UserRepo from "./UserRepo";

const data : User[] = [];

/**
 * 구현되야 함.
 */
export default class UserRepoImpl implements UserRepo{
  
  async insertUser(user: User): Promise<User> {
    console.warn('Mocking class has to be implemendted with real DB');
    const isExist = data.find(rw => {
      return user.username === rw.username
    });
    if(!isExist) {
      user.id = String(data.length + 1);
      data.push(user);
    } else {
      throw new Error('Duplicate username');
    }
    
    
    return data.find(
      rw => user.username === rw.username
    );
  }
  
  async findUserByUsername(username: string): Promise<User> {
    console.warn('Mocking class has to be implemendted with real DB');
    return data.find(
      rw => username === rw.username
    );
  }
  
  truncate(): void {
    console.warn('Mocking class has to be implemendted with real DB');
    data.length = 0;
  }
}