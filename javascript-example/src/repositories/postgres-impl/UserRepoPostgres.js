const UserRepo = require('../UserRepo').UserRepo;
const sequalize = require("sequelize");
// const sequalize {Sequelize, DataTypes, Model, ModelDefined, Optional, Options} from "sequelize";
const Sequelize = sequalize.Sequelize;
const DataTypes = sequalize.DataTypes;

const TABLE_NAME = 'users';
const POSTGRES_HOST = process.env.POSTGRES_HOST || 'localhost';
const POSTGRES_PORT = Number(process.env.POSTGRES_PORT) || 5432;
const POSTGRES_USERNAME = process.env.POSTGRES_USERNAME || 'postgres';
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'mysecretpassword';
const POSTGRES_DEFAULT_SCHEMA = process.env.POSTGRES_DEFAULT_SCHEMA || 'postgres';

const POSTGRES_OPTS = {
  host: POSTGRES_HOST,
  username: POSTGRES_USERNAME,
  port: POSTGRES_PORT,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DEFAULT_SCHEMA,
  dialect: 'postgres',
}

const seq = new Sequelize(POSTGRES_OPTS);

const initModel = function initUserModel() {
  const UserModel = seq.define(TABLE_NAME, {
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

exports.UserRepoPostgres = class UserRepoPostgres extends UserRepo {
  
  constructor() {
    super();
    console.info(POSTGRES_OPTS);
    this.model = initModel();
  }
  
  async insertUser(user) {
    const inserted = await this.model.create(user);
    return inserted.dataValues;
  }
  
  async findUserByUsername(username) {
    const found = await this.model.findOne({
      where: {username}
    });
    if (Boolean(found)) {
      return found.dataValues;
    }
    return undefined;
  }
  
  close() {
    seq.close()
  }
}
