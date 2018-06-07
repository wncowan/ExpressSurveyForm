var express = require("express");
var path = require("path");
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();
app.use(session({secret: '...'}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render("index");
});

app.post('/submit', function(req,res) {
    console.log("req.body", req.body);
    req.session.body = req.body.body;
    res.redirect('/display')
});

app.get('/display', function(req, res) {
    context = {body: req.session.body}
    console.log("context:", context);
    res.render("display", context);
});

app.listen(8000, function() {
    console.log("listening on port 8000");
});