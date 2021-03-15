const express = require('express')
const { body, validationResult } = require('express-validator')
const userController = require('./controller')

const check = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

const router = express.Router()

router.post('/',
  [
    body('name')
      .isString().withMessage('must be string')
      .isLength({ min: 3, max: 5 }).withMessage('muse between 3 ~ 5'),
    body('age')
      .isInt({ min: 1 }).withMessage('muse greater than 0'),
    check
  ],
  userController.registUser
)

exports.router = router
