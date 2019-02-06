// Require our module
var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");

// Set up our ports.  Either environment variable PORT, or 3000 as default.
var PORT = process.env.PORT || 3000;

// Create Express app.  Grabbing from express module
var app = express();

// Set up public folder for static files
app.use(express.static(__dirname + "/public"));

// Set handlebars as the templating engine.  Connect exphbs with express app
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}))
app.set("view engine", "handlebars");

// Set up data parsing
app.use(express.urlencoded({
    extended: true 
}));
app.use(express.json());

// Create Express Router
var router = express.Router();

// Set request to pass through middleware
app.use(router);

// Require routes.js file
require("./config/routes")(app);

// If deployed in prod, use mongod db.  Otherwise, use the local mongoHeadlines db
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// ==============================================================================
// NOTE: in order for Mongoose and MongoDB to talk to each other,
// start Mongo Daemon by inputting the following command in a new CL window
// $ mongod
// ==============================================================================
// Connect Mongoose to DB
mongoose.connect(db, function(error) {
    // If we cannot connect with Mongoose, log an error
    if (error) {
        console.log("Cannot connect to Mongoose 🐍 ", error);
    }
    // If we connect with Mongoose, log the success
    else {
        console.log("Mongoose connection is successful! 🦡");
    }
});





// Listen to port
app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
    );
});