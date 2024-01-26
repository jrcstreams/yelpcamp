
// EXPRESS - REQUIREMENT //
const express = require('express');
const router = express.Router({ mergeParams: true });

// MULTER & CLOUDINARY - REQUIREMENT //
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary')
const upload = multer({ storage })

// CONTROLLER - REQUIREMENT //
const campgrounds = require('../controllers/campgrounds')

// MODEL - REQUIREMENT //
const Campground = require('../models/campground')

// ERROR HANDLING  - REQUIREMENT //
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')

// SCHEMA - REQUIREMENT //
const { campgroundSchema } = require('../schemas.js')

// MIDDLEWARE
const review = require('../models/review');

//  INDEX CAMPGROUNDS, CREATE CAMPROUND DATA POST //
router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))


// NEW CAMPGROUND FORM //
router.get('/new', isLoggedIn, (campgrounds.renderNewForm))

// SHOW CAMPGROUND, UPDATE CAMPGROUND, DELETE CAMPGROUND //
router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

// EDIT CAMPGROUND //
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))



// ROUTER EXPORT // 
module.exports = router
