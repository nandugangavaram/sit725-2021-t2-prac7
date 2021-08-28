var expect = require('chai').expect;
var request = require('request');

describe("Checking if posts are retrieved successfully", function() {
    let url = "http://localhost:8080/posts";
    it("returns status 200 to check if GET API works", function(done) {
        request(url, function(req, res) {
            expect(res.statusCode).to.equal(200);
            done();
        });
    });
    it("Checking the number of posts", function(done) {
        request(url, function(req, res) {
            let body = JSON.parse(res.body);
            expect(body.data.length).to.greaterThanOrEqual(0);
            done();
        });
    });
});

describe("Checking if posts are retrieved successfully", function() {
    it("About page", function(done) {
        let url = "http://localhost:8080/about";
        request(url, function(req, res) {
            expect(res.statusCode).to.equal(200);
            done();
        });
    });
});

describe("Adding a recipe and verifying update", function() {
    it("Add Recipe", function(done) {
        let url = "http://localhost:8080/posts";        
        var oldTotalPosts = 0;
        var newTotalPosts = 0;

        request(url, function(req, res) {
            let body = JSON.parse(res.body);
            oldTotalPosts = body.data.length;

            let formData = {};
            formData.title = "Pizza";
            formData.image_url = "https://post.healthline.com/wp-content/uploads/2020/07/pizza-beer-1200x628-facebook-1200x628.jpg";
            formData.description = "Pizza Description";
            formData.brief_description = "Pizza Brief Description";
            formData.video_url = "Video URL";

            request.post({
                headers: {'content-type' : 'application/json'},
                url: 'http://localhost:8080/addRecipe',
                body: formData,
                json: true
              }, function(error, response, body){
                console.log(body);
              });

            request(url, function(req, res) {
                body = JSON.parse(res.body);
                newTotalPosts = body.data.length;
                expect(oldTotalPosts+1).to.equal(newTotalPosts);
                done();
            });
        });
    });
});