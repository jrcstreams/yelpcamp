// EXPRESS REQUIREMENTS //
const express = require('express')
const router = express.Router();

// CONTROLLER - REQUIREMENT //
const users = require('../controllers/users')

// ERROR HANDLING //
const catchAsync = require('../utils/catchAsync')

// MODEL REQUIREMENTS // 
const User = require('../models/user')

// PASSPORT AND MIDDLEWARE // 
const passport = require('passport')
const { storeReturnTo } = require('../middleware');
const LocalStrategy = require('passport-local')

// ROUTES // 

router.route('/register')
    .get((users.renderRegistrationForm))
    .post(catchAsync(users.registerUser))

router.route('/login')
    .get((users.renderLogin))
    .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (users.loginUser))

router.get('/logout', (users.logoutUser))




// MODULE EXPORT //

module.exports = router




