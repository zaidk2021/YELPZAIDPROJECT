const express=require("express");
const router=express.Router();
const campgrounds=require('../controllers/campgrounds');
const catchAsync=require('../utils/catchAsync');
const {campgroundSchema}=require('../schemas.js');
const {isLoggedIn,isAuthor,validateCampground}=require('../middleware');
const multer=require('multer');
const {storage}=require('../cloudinary');//here index.js not put in path as node does it by default
const upload=multer({storage});//req.files is only part of multer multer is used to oplad files to dest easiley
const Campground=require('../models/campground');
router.route('/')
.get(catchAsync(campgrounds.index))
.post(isLoggedIn,upload.array('image'),validateCampground,catchAsync(campgrounds.createCampground))
//image is id of photo from post of new.ejs

router.get('/new',isLoggedIn,campgrounds.renderNewForm);

router.route('/:id')
.get(catchAsync(campgrounds.showCampground))
.put(isLoggedIn,isAuthor,upload.array("image"),validateCampground,catchAsync(campgrounds.updateCampground))
.delete(isLoggedIn,isAuthor,catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit',isLoggedIn,isAuthor,catchAsync(campgrounds.renderEditForm));

module.exports=router;