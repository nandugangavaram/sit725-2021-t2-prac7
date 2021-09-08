require("dotenv").config();
let client = require("./dbConnect");
let express = require("express");
let app = express();

let server = require("http").createServer(app);
let io = require("socket.io")(server);

var port = process.env.PORT || 5500;

// routes
let projectsRoute = require('./routes/recipes');
const { LEGAL_TCP_SOCKET_OPTIONS } = require("mongodb");

// middlewares
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/', projectsRoute);

//Socket Connection
io.on('connection', (socket) => {
  console.log('New User Connected!');
  socket.on('disconnect', () => {
    console.log('User Disconnected!');
  });
  setInterval(()=>{
    socket.emit('dateTime', "Current Date & Time is: ");
  }, 5000);

  socket.on('Broadcast', (msg) => {
    console.log(msg);
    socket.broadcast.emit('message', msg);
  });
});

//Initial Server Load
server.listen(port, () => {
  console.log("Listening on port ", port);
  client.createCollection("Recipes");
});