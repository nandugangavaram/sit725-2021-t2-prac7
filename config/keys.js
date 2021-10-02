require("dotenv").config();

module.exports ={
    MongoURI:`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@sit725-2021-t2-prac4.mkubz.mongodb.net/IndianCookery?retryWrites=true&w=majority`
}