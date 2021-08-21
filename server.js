require("dotenv").config();
let client = require("./dbConnect");
let express = require("express");
let app = express();

let http = require("http").createServer(app);
let io = require("socket.io")(http);

var port = process.env.PORT || 5500;

// routes
let projectsRoute = require('./routes/recipes')

// middlewares
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/', projectsRoute);

app.listen(port, () => {
  console.log("Listening on port ", port);
  client.createCollection("Recipes");
});