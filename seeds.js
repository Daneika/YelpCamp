const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

const data = [
  {
    name: "Farm retreat",
    image: "http://localhost:8080/images/paul-hermann-XJuhZqEE4Go-unsplash.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    name: "Salmons Creek",
    image: "http://localhost:8080/images/glen-jackson-mzZVGFfMOkA-unsplash.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    name: "Cloud's rest",
    image: "http://localhost:8080/images/daan-weijers-pSaEMIiUO84-unsplash.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

function seedDB() {
  //Remove all campgrounds
  Campground.remove({}, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("removed camgrounds");
      // add a few campgrounds
      //   data.forEach(function (seed) {
      //     Campground.create(seed, function (err, campground) {
      //       if (err) {
      //         console.log(err);
      //       } else {
      //         console.log("added campground");
      //         //create a comment
      //         Comment.create(
      //           {
      //             text: "Place is great but I wish there was internet",
      //             author: "Homer",
      //           },
      //           function (err, comment) {
      //             if (err) {
      //               console.log(err);
      //             } else {
      //               campground.comments.push(comment);
      //               campground.save();
      //               console.log("created new comment");
      //             }
      //           }
      //         );
      //       }
      //     });
      //   });
    }
  });
}

module.exports = seedDB;
