const express = require('express');
const router = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const passport = require("passport")

//login handle
router.get('/login',(req,res)=>{
    res.render('login');
})
router.get('/register',(req,res)=>{
    res.render('register')
    })
//Register handle
router.post('/register',(req,res)=>{

    const {username,email, password, password2} = req.body;
let errors = [];
if(!username || !email || !password || !password2) {
    errors.push({msg : "Please fill in all fields"})
}

//check if match
if(password !== password2) {
    errors.push({msg : "passwords dont match"});
}

//check if password is more than 6 characters
if(password.length < 6 ) {
    errors.push({msg : 'password atleast 6 characters'})
}
if(errors.length > 0){
    res.render('register', {
        errors : errors,
        username : username,
        email : email,
        password : password,
        password2 : password2})
} 

else{
    User.findOne({email : email}).exec((err,user)=>{
        console.log(user);   
        if(user) {
            errors.push({msg: 'email already exist'});
            render(res,errors,username,email,password,password2);
            
           } else {
            const newUser = new User({
                username : username,
                email : email,
                password : password
            })
//hash password
bcrypt.genSalt(10,(err,salt)=> 
bcrypt.hash(newUser.password,salt,
    (err,hash)=> {
        if(err) throw err;
            //save pass to hash
            newUser.password = hash;
        //save user
        newUser.save()
        .then((value)=>{
            console.log(value)
            req.flash('success_msg','You have now registered!')
        res.redirect('/users/login');
        })
        .catch(value=> console.log(value));
          
    }));
    
}
  
});
}
})


router.post('/login',(req,res,next)=>{

    passport.authenticate('local',{
        successRedirect : '/dashboard',
        failureRedirect : '/users/login',
        failureFlash : true,
        })(req,res,next);

  })

//logout
router.get('/logout',(req,res)=>{
    req.logout();
req.flash('success_msg','Now logged out');
res.redirect('/users/login');
 })
module.exports  = router;