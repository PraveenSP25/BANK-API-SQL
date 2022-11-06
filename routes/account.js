const express = require('express');
const { body } = require('express-validator');
const accountcontroler = require('../controler/account')
const Phone = require("../models/post")
const router = express.Router()

const is_user_account = require("../middleware/is_user_account")
router.post('/post', is_user_account,
  [
    body("phoneno")
      .isMobilePhone()
     
      .withMessage("please enter valid phone number."),

    body('name')
      .trim()
      .isLength({ min: 4 }),
    body('initialbalance')
      .trim()
      .isLength(3)
  ],
  accountcontroler.createaccount)


router.get('/post', is_user_account,accountcontroler.getPost)
router.put('/post/:Acno',is_user_account, [
  body('name')
    .trim()
    .isLength({ min: 1 }),
  body('acno')
    .trim()
    .isLength(12),
  body('phoneno')
    .trim()
    .isLength(10),
  body('initialbalance')
    .trim()
    .isLength(3)

], accountcontroler.updatePost)
router.delete('/post/:Acno', is_user_account,accountcontroler.deletePost)

module.exports = router;