require("dotenv").config();
let express = require("express");
const MongoClient = require("mongodb").MongoClient;
let app = express();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@sit725-2021-t2-prac4.mkubz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

let http = require("http").createServer(app);
let io = require("socket.io")(http);

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + "/public"));

app.get("/about", function (request, response) {
  response.sendFile(__dirname + "/public/about.html");
});

//socket test
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

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
  })
};  

app.listen(port, () => {
  console.log("Listening on port ", port);
  createCollection("Projects");
});