const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  flash = require("connect-flash"),
  Campground = require("./models/campground"),
  Comment = require("./models/comment"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose"),
  methodOverride = require("method-override")
  User = require("./models/user"),
seedDB = require("./seeds");

// Requiring Routes
const commentRoutes = require("./routes/comments"),
  campgroundRoutes = require("./routes/campgrounds"),
  indexRoutes = require("./routes/index");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/yelp_camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(flash());
app.set("view engine", "ejs");


// seedDB();

// PASSPORT CONFIGURATION
app.use(
  require("express-session")({
    secret: "I am now going to tell a secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
})


app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

const server = app.listen(process.env.PORT || 8080, function () {
  console.log("Yelp Camp has started!!!");
});
