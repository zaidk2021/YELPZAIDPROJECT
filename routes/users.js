const express=require('express');
const router=express.Router({mergeParams:true});
const passport=require('passport');
const catchAsync=require('../utils/catchAsync');
const { storeReturnTo } = require('../middleware');
const User=require('../models/user');
const users=require('../controllers/users');
router.route('/register')
.get(users.renderRegister)
.post(catchAsync( users.register))
router.route('/login')
 .get(users.renderLogin)
 .post(
    // use the storeReturnTo middleware to save the returnTo value from session to res.locals
     storeReturnTo,
    // passport.authenticate logs the user in and clears req.session
    passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}),
    // Now we can use res.locals.returnTo to redirect the user after login
    users.login);
router.get('/logout', users.logout); 
module.exports=router;