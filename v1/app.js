var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

// To make the array to have the global scope

var campgrounds = [
    {name: "Salomon Creek", image:"https://farm1.staticflickr.com/82/225912054_690e32830d.jpg"},
    {name: "Granite Hill", image:"https://farm4.staticflickr.com/3924/14422533026_9be7d49684.jpg"},
    {name: "Mountain Goat's Rest", image:"https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104497f8c279afe5b3b0_340.jpg"},
    {name: "Salomon Creek", image:"https://farm1.staticflickr.com/82/225912054_690e32830d.jpg"},
    {name: "Granite Hill", image:"https://farm4.staticflickr.com/3924/14422533026_9be7d49684.jpg"},
    {name: "Mountain Goat's Rest", image:"https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104497f8c279afe5b3b0_340.jpg"},
    {name: "Salomon Creek", image:"https://farm1.staticflickr.com/82/225912054_690e32830d.jpg"},
    {name: "Granite Hill", image:"https://farm4.staticflickr.com/3924/14422533026_9be7d49684.jpg"},
    {name: "Mountain Goat's Rest", image:"https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104497f8c279afe5b3b0_340.jpg"},
    {name: "Salomon Creek", image:"https://farm1.staticflickr.com/82/225912054_690e32830d.jpg"},
    {name: "Granite Hill", image:"https://farm4.staticflickr.com/3924/14422533026_9be7d49684.jpg"},
    {name: "Mountain Goat's Rest", image:"https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104497f8c279afe5b3b0_340.jpg"}
]

//ROUTES
app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds",function(req,res){
    
    res.render("campgrounds" ,{campgrounds:campgrounds});

});

app.post("/campgrounds",function(req,res){
    // In this we have to get the data from the form
    // And after getting the data back we have to add it to the campgrounds array which is above
    // After this we have to redirect this to /campgrounds
    var name = req.body.name;
    var imageURL = req.body.image;

    var newCampgrounds = { name: name, image: imageURL};
    campgrounds.push(newCampgrounds);
    
    res.redirect("/campgrounds");


});

app.get("/campgrounds/new",function(req,res){
    res.render("new");
});


app.listen(8080,function(){
    console.log("The YelpCamp Server is Started");
});