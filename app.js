const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const routes = require('./routes/user');

const app = express();

//middleware
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));

//routes implementation
// app.use("", require("./routes/user"));
app.use(routes);

//connect to mongodb
mongoose.connect("mongodb://127.0.0.1:27017/userDb", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connected successfull"))
    .catch((err) => { console.error(err); });

app.listen(3000, () => {
    console.log("server is running on port 3000");
})