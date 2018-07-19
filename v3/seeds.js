var mongoose = require("mongoose"),
Campground   = require("./models/campgrounds"),
Comment      = require("./models/comment");

// In the begining we want some default data to be used

var data = [
    {
        name: "Salomon Creek", 
        image:"https://farm1.staticflickr.com/82/225912054_690e32830d.jpg",
        description: "This is the description"
    },
    {
        name: "Granite Hill", 
        image:"https://farm4.staticflickr.com/3924/14422533026_9be7d49684.jpg",
        description: "This is the description"
    },
    {
        name: "Mountain Goat's Rest", 
        image:"https://pixabay.com/get/e836b60729f2063ed1584d05fb1d4e97e07ee3d21cac104497f8c57ca6edb1ba_340.jpg",
        description: "This is the description"
    }
]

function seedDB(){
    // Removes all campgrounds

    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Removed campgrounds");

        // Adding few campgrounds
        data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if(err){
                console.log(err);
            } else {
                console.log("New campground added");

                // create a comment
                Comment.create({
                    text: "This place is great, but I wish there was internet",
                    authou: "Praveen"
                },function(err, comment){
                    if(err){
                        console.log(err);
                    } else {
                        campground.comments.push(comment);
                        campground.save();
                        console.log("Created new comment");
                    }
                });
            }
        });
        
    });
    });
}

module.exports = seedDB;