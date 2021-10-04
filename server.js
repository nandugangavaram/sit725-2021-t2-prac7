require("dotenv").config();
const mongo = require('./dbConnect')
let express = require("express");
let app = express();

let server = require("http").createServer(app);
let io = require("socket.io")(server);

var port = process.env.PORT || 5500;

var users = [];

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
  // console.log(io);
  console.log(`A New User Connected with ID: ${socket.id} & total users are ${io.engine.clientsCount}`);

  socket.on('disconnect', () => {
    // let userName = users.filter(x => x.id == socket.id)[0].Name;
    console.log(`User ${socket.id} has disconnected & total users are ${io.engine.clientsCount}`);
    socket.broadcast.emit('user', {"id" : socket.id, "Name" : "TEST", "Message": `A user disconnected from chat & total active users are ${io.engine.clientsCount}`});
  });

  socket.on('userMessage', (message) => {
    let userName = users.filter(x => x.id == socket.id)[0].Name;
    console.log(users, users.filter(x => x.id == socket.id), userName);
    socket.broadcast.emit('message', {"id" : socket.id, "Name" : userName, "Message": message})
    console.log(`Socket ID ${socket.id} message: ${message}`);
  });

  socket.on('addUser', (userName) => {
    users.push({"id": socket.id, "Name" : userName});
    socket.broadcast.emit('user', {"id" : socket.id, "Name" : userName, "Message": `${userName} has connected to chat! & total active users are ${io.engine.clientsCount}`})
    console.log(`Socket ID ${socket.id} User: ${userName}`);
  });
  setInterval(()=>{
    socket.emit('dateTime', "Current Date & Time is: ");
  }, 5000);

  socket.on('BroadcastCreatePost', (msg) => {
    socket.broadcast.emit('CreatePost', msg);
  });

  socket.on('Broadcast', (msg) => {
    console.log(msg);
    socket.broadcast.emit('message', msg);
  });
});

// Connect to mongo
mongo();

//Initial Server Load
server.listen(port, () => {
  console.log("Listening on port ", port);
});