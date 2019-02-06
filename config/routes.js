module.exports = function(app) {
    // Render "index" page
    app.get("/", function(req, res) {
        res.render("index", {
            style: "style.css"
        });
    });
    // Render "saved" page
    app.get("/saved", function(req, res) {
        res.render("saved");
    });
};