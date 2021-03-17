import * as express from "express";
import {userService} from "../services";
import {User} from "../models/users";

const router = express.Router();

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
    await userService.createUser(user)
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
  
  const isSuccess = await userService.signin(user);
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