import {User} from "../../domains/users";
import UserRepo from "../UserRepo";
import {DocumentClient} from "aws-sdk/clients/dynamodb";

const AWS = require('aws-sdk');

const TABLE_NAME = 'Users';
const AWS_REGION = process.env.AWS_REGION || 'local';
const AWS_ENDPOINT = 'http://' + (process.env.AWS_ENDPOINT || 'localhost:8000');
const AWS_API_VERSION = process.env.AWS_API_VERSION || '2012-08-10';
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || 'demo';
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || 'demo';

AWS.config.update({
  region: AWS_REGION,
  endpoint: AWS_ENDPOINT,
  apiVersion: AWS_API_VERSION,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

export default class UserRepoDynamo implements UserRepo{
  private client;
  
  constructor() {
    this.client = new DocumentClient();
  }
  
  async insertUser(user: User): Promise<User> {
    let param = this.wrapUserAsParamToUpdate(user);
    const req = new Promise<User> (async (resolve, reject) => {
      await this.checkDuplicate(user.username, reject);
      this.client.put(param, async (err, data) => {
        if (err) {
          console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
          reject(err);
        }
        
        let inserted = await this.findUserByUsername(user.username);
        resolve(inserted);
      });
    });
    return req;
  }
  
  async findUserByUsername(username: string): Promise<User> {
    let params = this.wrapUserAsParamToGet({ username }, false);
    return new Promise<User> (  (resolve, reject) => {
        this.client.query(params, (err, data) => {
          if (err) {
            console.error("Unable to get item. Error JSON:", JSON.stringify(err, null, 2));
            reject(err);
          }
          
          resolve(data.Items.pop());
        });
      }
    );
  }
  
  async close() {
    const scanParams = {
      TableName: TABLE_NAME,
    }
    const prosedure = new Promise( (resolve, reject) => {
      this.client.scan(scanParams, (scanErr, scanData) => {
        const delItem = (rw) => {
          const delParams = {
            TableName: TABLE_NAME,
            Key: {
              username: rw.username,
              id: rw.id
            },
          }
          this.client.delete(delParams, (err, data) => {
            if (err) {
              console.error("Unable to get item. Error JSON:", JSON.stringify(err, null, 2));
              reject(err);
            }
          
            resolve(data);
          });
        };
        if (scanData.Items.length == 0) {
          resolve(true);
        }
        scanData.Items.forEach(delItem);
      })
    });
    await prosedure;
  }
  
  private async checkDuplicate(username: string, reject: (string)=>void) {
    let preRow = await this.findUserByUsername(username);
    if(preRow) {
      reject('Duplicate username');
    }
  }
  private wrapUserAsParamToUpdate(user: User, isNew: boolean = true) {
    user.id = isNew ?  this.fakeUUID(user.username) : user.id;
    return {
      TableName: TABLE_NAME,
      Item: user,
    };
  }
  
  private wrapUserAsParamToGet(user: User, ...opts) {
    return {
      TableName: TABLE_NAME,
      KeyConditionExpression: "username = :username",
      ExpressionAttributeValues: {
        ":username": user.username
      },
      ...opts
    };
  }
  
  private fakeUUID (name: string): string {
    return new Date().toTimeString() + '-' + name;
  }
}
