var express = require("express"),
app         = express(),
bodyParser  = require("body-parser"),
mongoose    = require("mongoose"),
Campground  = require("./models/campgrounds"),
seedDB      = require("./seeds");

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


//ROUTES

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
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
            console.log(foundCampground);
            // render show template with that campground
            res.render("show",{campground: foundCampground});
        }
    });
});


app.listen(8080,function(){
    console.log("The YelpCamp Server is Started");
});