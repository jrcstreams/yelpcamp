// EXPRESS //

const express = require('express');


const campgrounds = require('../controllers/campgrounds')
const reviews = require('../controllers/reviews')


const router = express.Router({ mergeParams: true });

// MODEL REQUIREMENTS //

const Campground = require('../models/campground')
const Review = require('../models/review')

// MIDDLEWARE IMPORT //

const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')


// ERROR HANDLING // 

const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')


// ADD A REVIEW //

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.addReview))

// DELETE A REVIEW //

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))


// EXPORT ROUTE //

module.exports = router;