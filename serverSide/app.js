var express = require('express');
var fs = require("fs");
var path = require("path");
var morgan = require("morgan");
var cors = require("cors");
var bodyParser = require("body-parser");
var routes = require("./routes/route")
var app = express();
//middlewares used 
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'rtfLogFile.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use("/file", express.static(path.join(__dirname, 'userUploads')))
app.use("/file", routes);

app.listen(3000, function (req, res) {
  console.log("You are listening to port 3000")
});