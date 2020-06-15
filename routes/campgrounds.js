const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware");

// INDEX - show all campgrounds
router.get("/", function (req, res) {
  console.log(req.route.path, req.body);
  // Get all campgrounds from DB
  Campground.find({}, function (err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/campgrounds", {
        campgrounds: allCampgrounds,
        currentUser: req.user,
      });
    }
  });
});

// CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function (req, res) {
  console.log(req.route.path, req.body);
  const name = req.body.name;
  const price = req.body.price;
  const image = req.body.image;
  const desc = req.body.description;
  const author = {
    id: req.user._id,
    username: req.user.username,
  };
  let newCampground = {
    name: name,
    price: price,
    image: image,
    description: desc,
    author: author,
  };
  // Create a new campground and save to DB
  Campground.create(newCampground, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      console.log(newlyCreated);
      res.redirect("/campgrounds");
    }
  });
});

// NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function (req, res) {
  console.log(req.route.path, req.body);
  res.render("campgrounds/new");
});

// SHOW- shows more info about one campground
router.get("/:id", function (req, res) {
  // find the campground with provided ID
  console.log(req.route.path, req.body);
  Promise.all([
    Campground.find({}, function (err, campgrounds) {
      if (err) {
        console.log(err);
      } else {
        // console.log(`All the campgrounds are ${campgrounds}`);
        return campgrounds;
      }
    }),
    Campground.findById(req.params.id)
      .populate("comments"),
  ])
    .then(([allCampgrounds, campground]) => {
      console.log(campground);
      res.render("campgrounds/show", { allCampgrounds, campground });
    })
    .catch((err) => console.error(err));
});

// EDIT - campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function (
  req,
  res
) {
  Campground.findById(req.params.id, function (err, foundCampground) {
    res.render("campgrounds/edit", { campground: foundCampground });
  });
});

// UPDATE - campground route
router.put("/:id", middleware.checkCampgroundOwnership, function (req, res) {
  // find and update the correct campground
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (
    err,
    updatedCampground
  ) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// DESTROY - campground route
router.delete("/:id", middleware.checkCampgroundOwnership, function (req, res) {
  Campground.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  });
});

module.exports = router;
