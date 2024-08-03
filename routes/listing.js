const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const { index, renderNewForm, showListing, createListing, editListing, updateListing, destroyListing } = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});


router.route("/")
.get(wrapAsync(index))    //All Listings Route
.post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(createListing));  //Create Listing Route

router.get("/new", isLoggedIn, wrapAsync(renderNewForm));      //New Listing Route

router.route("/:id")
.get(wrapAsync(showListing))         //Show Listing Route
.put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(updateListing))      //Update Listing Route
.delete(isLoggedIn, isOwner, wrapAsync(destroyListing));     //Destroy Listing Route

router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(editListing));    //Edit Listing Route


module.exports = router;