var axios = require("axios");
var cheerio = require("cheerio");

var scrape = function (cb) {

    axios("http://www.nytimes.com", function(err, res, body){

        var $ = cheerio.load(body);

        var articles = [];

        $(".css-8atqhb").each(function(i, element){
            
            var head = $(this).children(".esl82me2").text().trim();
            var sum = $(this).children(".e1n8kpyg1").text.trim();

            if(head && sum){
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                var dataToAdd = {
                    headline: headNeat,
                    summary: sumNeat
                };
                    articles.push(dataToAdd);
            }
        });
        cb(articles);
    });
};

module.exports = scrape;

// h2 class css-9ywo2s esl82me2 - for the title
// css-1rrs2s3 e1n8kpyg1