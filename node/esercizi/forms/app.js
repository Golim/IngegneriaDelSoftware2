/*
 * app.js
 * Main entry point of the forms project
 * This script shows how to create a server
 * that can handle request from web forms
 */
var express = require('express');
var app = express();

// Loading utils to inspect the content of js objects
var util = require('util');

var port = 3000;

app.use('/', express.static('public'));

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());




var people = [{
    name: "Mario Ferrari",
    email: "fake@news.it"
  },
  {
    name: "Carlo Smith",
    email: "youreach@menot.it"
  },
  {
    name: "Fabio Ferrari",
    email: "email@email.com"
  }
];

// Handling GET requests
app.get('/search', function (req, res) {
  var items = "";

  items = "<table style=\"border: 1px solid black;\"><tr style=\"border: 1px solid black;\"><th>Name</th><th>Email</th></tr>"

  people.forEach(p => {

    items += "<tr><th>" + p.name + "</th><th>" + p.email + "</th></tr>";
  });

  items += "</table>";

  res.status(200).send('These are the items found!<br><br>' + items);
});

app.post('/subscribe', function (req, res) {
  var name = req.body.name;
  var email = req.body.email;

  var present = false;
  people.forEach(p => {
    if (!present && p.email === email)
      present = true;
  });

  if (!present) {
    people.push({
      name: name,
      email: email
    });

    res.status(201).send('You are now subscribed!');
  } else {
    res.status(201).send('You are yet subscribed!');
  }
});

app.listen(port, function () {
  console.log('Server running on port ', port);
});