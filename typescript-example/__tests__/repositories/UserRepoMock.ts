import {User} from "@/models/users";
import UserRepo from "@/repositories/UserRepo";

const data : User[] = [];

export default class UserRepoMock implements UserRepo{
  
  async insertUser(user: User): Promise<User> {
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
    return data.find(
      rw => username === rw.username
    );
  }
  
  truncate(): void {
    data.length = 0;
  }
}