var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");
// SCHEMA SETUP

var campgroundSchema = new mongoose.Schema({
    name: "String",
    image: "String",
    description: "String"
});

var Campground = mongoose.model("Campground",campgroundSchema);

// Campground.create({
//     name: "Mountain Goat's Rest", 
//     image:"https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104497f8c279afe5b3b0_340.jpg",
//     description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
//     },function(err, campground){
//         if(err){
//             console.log(err);
//         }else{
//             console.log("New campground added");
//             console.log(campground);
//         }
//     });

//ROUTES
//
app.get("/",function(req,res){
    res.render("landing");
});

// INDEX - the landing page

app.get("/index",function(req,res){
    // Get all the data from DB:
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("index" ,{campgrounds:allCampgrounds});
        }
    });
});

// CREATE - add new campgrounds to the DB:

app.post("/index",function(req,res){
    // In this we have to get the data from the form
    // And after getting the data back we have to add it to the campgrounds array which is above
    // After this we have to redirect this to /campgrounds
    var name = req.body.name;
    var imageURL = req.body.image;
    var desc = req.body.description;

    var newCampground = { name: name, image: imageURL, description: desc};
    Campground.create(newCampground,function(err, campground){
            if(err){
                console.log(err);
            }else{
                res.redirect("/index");
            }
        });
});

// NEW - show form to create new campgrounds

app.get("/index/new",function(req,res){
    res.render("new");
});

// SHOW - shows more info about one campgrounds

app.get("/index/:id",function(req,res){
    // find the campgrounds with provided ID
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
            // render show template with that campground
            res.render("show",{campground: foundCampground});
        }
    });
});


app.listen(8080,function(){
    console.log("The YelpCamp Server is Started");
});