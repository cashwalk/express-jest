import {User} from "../../domains/users";
import UserRepo from "../UserRepo";
import {Sequelize, DataTypes, Model, ModelDefined, Optional, Options} from "sequelize";

const TABLE_NAME = 'users';
const POSTGRES_HOST = process.env.POSTGRES_HOST || 'localhost';
const POSTGRES_PORT = Number(process.env.POSTGRES_PORT) || 5432;
const POSTGRES_USERNAME = process.env.POSTGRES_USERNAME || 'postgres';
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'mysecretpassword';
const POSTGRES_DEFAULT_SCHEMA = process.env.POSTGRES_DEFAULT_SCHEMA || 'postgres';

const POSTGRES_OPTS: Options = {
  host: POSTGRES_HOST,
  username: POSTGRES_USERNAME,
  port: POSTGRES_PORT,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DEFAULT_SCHEMA,
  dialect: 'postgres',
}

const seq = new Sequelize(POSTGRES_OPTS);

interface UserCreationAttr extends Optional<User, 'id' | 'username'> {};
interface UserInstance extends Model<User, UserCreationAttr> {
  dataValues: object;
}

const initModel = function initUserModel() {
  const UserModel = seq.define<UserInstance>(TABLE_NAME, {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    username: { type: DataTypes.STRING, primaryKey: true },
    password: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
  },
    {
      freezeTableName: true,
      timestamps: false,
    });
  return UserModel;
};

export default class UserRepoPostgres implements UserRepo{
  private model;
  
  constructor() {
    console.info(POSTGRES_OPTS);
    this.model = initModel();
  }
  
  async insertUser(user: User): Promise<User> {
    const inserted: UserInstance = await this.model.create(user);
    return inserted.dataValues as User;
  }
  
  async findUserByUsername(username: string): Promise<User> {
    const found = await this.model.findOne({
      where: {username}
    });
    if (Boolean(found)) {
      return found.dataValues as User;
    }
    return undefined;
  }
  
  close() {
    this.model.truncate();
  }
}
