var express = require('express');
var app = express();

var port = 3000;

app.use('/esercizi', express.static('public'));

// Handling GET requests
app.get('/', function(req, res){ 
  res.send('Hello World!');
});

app.listen(port, function() {
  console.log('Server running on port ', port);
});