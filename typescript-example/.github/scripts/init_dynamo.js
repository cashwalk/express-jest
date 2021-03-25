const AWS = require('aws-sdk');
const TABLE_NAME = 'Users';

const AWS_REGION = process.env.AWS_REGION || 'local';
const AWS_ENDPOINT = 'http://' + (process.env.AWS_ENDPOINT || 'localhost:8000');
const AWS_API_VERSION = process.env.AWS_API_VERSION || '2012-08-10';
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || 'demo';
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || 'demo';

const opt = {
  region: AWS_REGION,
  endpoint: AWS_ENDPOINT,
  apiVersion: AWS_API_VERSION,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
};
console.log(opt);

AWS.config.update({
  region: AWS_REGION,
  endpoint: AWS_ENDPOINT,
  apiVersion: AWS_API_VERSION,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

const dynamo = new AWS.DynamoDB();

const initDB =  function () {
  const userProperties = {
    TableName: TABLE_NAME,
    KeySchema: [
      {AttributeName: "username", KeyType: "HASH"},
      {AttributeName: "id", KeyType: "RANGE"},
    ],
    AttributeDefinitions: [
      {AttributeName: "id", AttributeType: "S"},
      {AttributeName: "username", AttributeType: "S"},
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10
    }
  };
  
  dynamo.createTable(userProperties, (err, data) => {
    if (err) {
      console.error("Unable to create table. Error JSON: ", JSON.stringify(err, null, 2));
    } else {
      console.info("Created table. Table desc JSON:", JSON.stringify(data, null, 2));
    }
  });
};


initDB();