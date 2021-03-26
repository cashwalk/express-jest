import {User} from "../../domains/users";
import UserRepo from "../UserRepo";
import * as mysql from 'mysql';
import {Connection} from "mysql";

const TABLE_NAME = 'user';
const MYSQL_HOST = process.env.MYSQL_HOST || 'localhost';
const MYSQL_PORT = Number(process.env.MYSQL_PORT) || 3306;
const MYSQL_USERNAME = process.env.MYSQL_USERNAME || 'root';
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || 'rootpassword';
const MYSQL_DEFAULT_SCHEMA = process.env.MYSQL_DEFAULT_SCHEMA || 'test_db';

const MYSQL_OPTS = {
  host: MYSQL_HOST,
  user: MYSQL_USERNAME,
  port: MYSQL_PORT,
  password: MYSQL_PASSWORD,
  database: MYSQL_DEFAULT_SCHEMA,
};

export default class UserRepoMySQL implements UserRepo{
  private pool;
  
  constructor() {
    if (process.env.NODE_ENV === 'production') {
      this.pool = {
        getConn: (cb: (err, connection) => void ) => {
          const pool = mysql.createPool(MYSQL_OPTS);
          pool.getConnection((err, conn) => {
            conn.release();
            if(err) cb(err, null);
  
            cb(null, conn);
          });
        }
      };
    } else {
      this.pool = {
        getConn: (cb: (err, connection) => void ) => {
          const conn: Connection = mysql.createConnection(MYSQL_OPTS);
          try {
            conn.connect();
            cb(null, conn);
          } catch (e) {
            cb(e, null);
          } finally {
            conn.end();
          }
        }
      };
    }
  }
  
  async insertUser(user: User): Promise<User> {
    return new Promise<User> ((resolve, reject) => {
      this.pool.getConn((err, conn) => {
        if (err) throw err; // not connected!
    
        const sql: string = `INSERT INTO ${TABLE_NAME} (username, password, name) VALUES ('${user.username}', '${user.password}', '${user.name}')`;
        conn.query(sql, async (error, results, fields) => {
          if (error) reject(error);
          if (!Boolean(results)) {
            reject(new Error('No Result FROM DB'));
          } else {
            const insertedOne = await this.findUserByPK(results.insertId);
            resolve(insertedOne);
          }
        });
      });
    });
  }
  
  async findUserByUsername(username: string): Promise<User> {
    return new Promise<User> ((resolve, reject) => {
      this.pool.getConn(function(err, conn) {
        if (err) throw err; // not connected!

        const sql: string = `SELECT * FROM ${TABLE_NAME} WHERE username='${username}'`;
        conn.query(sql, function (error, results, fields) {
          if (error) reject(error);

          resolve(results.pop());
        });
      });
    });
  }
  
  async findUserByPK (prmiaryKey: string): Promise<User> {
    return new Promise<User> ((resolve, reject) => {
      this.pool.getConn(function(err, conn) {
        if (err) throw err; // not connected!
      
        const sql: string = `SELECT * FROM ${TABLE_NAME} WHERE id='${prmiaryKey}'`;
        conn.query(sql, function (error, results, fields) {
          if (error) reject(error);
        
          resolve(results.pop());
        });
      });
    });
  
  }
  
  truncate() {
  }
}
