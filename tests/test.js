var expect = require('chai').expect;
var request = require('request');

describe("Checking if posts are retrieved successfully", function() {
    var url = "http://localhost:8080/posts";
    it("returns status 200 to check if GET API works", function(done) {
        request(url, function(req, res) {
            expect(res.statusCode).to.equal(200);
            done();
        });
    });
})