import UserService from "./UserService";
import UserRepoImpl from "@/repositories/UserRepoImpl";

export const userService = new UserService(new UserRepoImpl());