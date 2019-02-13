// scrape script call
var scrape = require("../scripts/scrape");

// Headline and notes call
var headlinesController = require("../controllers/headlines");
var notesController = require("../controllers/notes");


module.exports = function(app) {
    // Render "index" page
    app.get("/", function(req, res) {
        res.render("index", {
            style: "index.css"
        });
    });
    // Render "saved" page
    app.get("/saved", function(req, res) {
        res.render("saved", {
            style: "saved.css"
        });
    });

    app.get("/api/fetch", function(req, res) {
        headlinesController.fetch(function(err, docs) {
            if (!docs || docs.insertedCount === 0) {
                res.json({
                    message: "No new articles found."
                });
            } else {
                res.json({
                    message: "Added " + docs.insertedCount + " new articles!"
                });
            }
        });
    });
    app.get("/api/headlines", function(req, res) {
        var query = {};
        if (req.query.saved) {
            query = req.query;
        }

        headlinesController.get(query, function(data) {
            res.json(data);
        });
    });

    app.delete("/api/headlines/:id", function(req, res) {
        var query = {};
        query._id = req.params.id;
        headlinesController.delete(query, function(err, data) {
            res.json(data);
        });
    });

    app.patch("/api/headlines", function(req, res) {
        headlinesController.update(req.body, function(err, data) {
            res.json(data);
        });
    });

    app.get("/api/notes/:headline_id?", function(req, res) {
       var query = {};
       if (req.params.headline_id) {
           query._id = req.params.headline_id;
       }
       notesController.get(query, function(err, data) {
           res.json(data);
       });
   });

   // To delete notes
   app.delete("/api/notes/:id", function(req, res) {
       var query = {};
       query._id = req.params.id;
       notesController.delete(query, function(err, data) {
           res.json(data);
       });
   });

   app.post("/api/notes", function(req, res) {
       notesController.save(req.body, function(data) {
           res.json(data);
       });
   });

};