import * as express from "express"
import router from './routers/user-router';
import {urlencoded, json as jsonencoded} from 'body-parser';

class App {
  public application : express.Application;
  constructor(){
    this.application = express();
  }
}
const app = new App().application;

app.use(urlencoded({
  extended: true
}));
app.use(jsonencoded());
app.use(router);

const init = () => {
  app.listen(4000,()=>console.log("start"));
};
export default init;

export {app};