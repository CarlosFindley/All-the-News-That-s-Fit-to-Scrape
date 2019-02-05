// Require our module
var express = require("express");

// Set up our ports.  Either environment variable PORT, or 3000 as default.
var PORT = process.env.PORT || 3000;

// Create Express app.  Grabbing from express module
var app = express();

// Create Express Router
var router = express.Router();

// Set up public folder for static files
app.use(express.static(__dirname + "/public"));

// Set request to pass through middleware
app.use(router);

// Listen to port
app.listen(PORT, function() {
    console.log("Listening on port: " + PORT);
});