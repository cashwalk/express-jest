const express = require("express");
const userService = require("../services").userService;

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.post('/signup', async (req, res) => {
  const user = {
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
  const user = {
    username: req.body.username,
    password: req.body.password
  }
  
  const isSuccess = await userService.signin(user);
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

exports.router = router;