import UserService from "./UserService";
import UserRepoDynamo from "../repositories/dynamo-impl/UserRepoDynamo";
import UserRepoMySQL from "../repositories/mysql-impl/UserRepoMySQL";
import UserRepoPostgres from "../repositories/postgres-impl/UserRepoPostgres";

const DB_TYPE = process.env.DB_TYPE || 'dynamo';

console.info(`DB type is ${process.env.DB_TYPE}`);
export const userService = (function initUserService() {
  if (DB_TYPE.toLowerCase() === 'mysql') {
    return new UserService(new UserRepoMySQL());
  } else if (DB_TYPE.toLowerCase() === 'postgres') {
    return new UserService(new UserRepoPostgres());
  } else {
    return new UserService(new UserRepoDynamo());
  }
})();
