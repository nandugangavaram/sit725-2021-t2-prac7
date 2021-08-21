let express = require("express");
const MongoClient = require("mongodb").MongoClient;

var projectCollection;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@sit725-2021-t2-prac4.mkubz.mongodb.net/IndianCookery?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const createCollection = (collection) => {
    client.connect(err => {
        projectCollection = client.db().collection(collection);
        // perform actions on the collection object
        if(err) {
        console.log("DB CONNECTION FAILED!");
        process.exit(1);
        } else {
        console.log("DB CONNECTED SUCCESSFULLY");
        }
    });
};  

module.exports = {createCollection, mongodbClient: client};
  