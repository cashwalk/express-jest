import UserService from "./UserService";
import UserRepoDynamo from "../repositories/dynamo-impl/UserRepoDynamo";
import UserRepoMySQL from "@/repositories/mysql-impl/UserRepoMySQL";

const DB_TYPE = process.env.DB_TYPE || 'dynamo';

export const userService = (function initUserService() {
  if (DB_TYPE.toLowerCase() === 'mysql') {
    return new UserService(new UserRepoMySQL());
  } else if (DB_TYPE.toLowerCase() === 'postgres') {
    return new UserService(new UserRepoDynamo());
  } else {
    return new UserService(new UserRepoDynamo());
  }
})();