import {User} from "@/models/users";

export default interface UserRepo {
  insertUser: (user: User) => Promise<User>;
  findUserByUsername: (username: string) => Promise<User>;
  truncate: () => void;
}