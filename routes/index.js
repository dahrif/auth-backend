const express = require('express');
const router  = express.Router();
const {ensureAuthenticated} = require("../config/auth.js");

const {
  dash,
  addUserRoute,
  updateUserRoute,
} = require('../services/render');
const {
  create,
  find,
  update,
  deleteUser
} = require('../controller/controller');
//login page
router.get('/',(req,res)=>{
    res.render('welcome');
})
//register page
router.get('/register', (req,res)=>{
    res.render('register');
})

router.get('/dashboard', ensureAuthenticated ,(req,res)=>{
  res.render('dashboard',{
    user: req.user
    });
  })

  

router.get('/users', ensureAuthenticated , find);  

module.exports = router; 