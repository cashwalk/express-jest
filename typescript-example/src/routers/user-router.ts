import * as express from "express";
import UserRepoImpl from "../repositories/UserRepoImpl";
import UserService from "../services/UserService";
import {User} from "../models/users";

const router = express.Router();

const usrService = new UserService(new UserRepoImpl());

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.post('/signup', async (req, res) => {
  const user: User= {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  }
  
  try {
    await usrService.createUser(user)
    res.json({
      result: true
    });
  } catch (e) {
    res.json({
      result: false,
      message: 'fail reason'
    });
  }
})

router.post('/signin', async (req, res) => {
  const user: User= {
    username: req.body.username,
    password: req.body.password
  }
  
  const isSuccess = await usrService.signin(user);
  console.log(isSuccess)
  if( isSuccess ) {
    res.json({
      result: true
    });
  } else {
    res.json({
      result: false,
      message: 'fail reason'
    });
  }
})

export default router;