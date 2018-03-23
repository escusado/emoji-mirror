var express = require('express');
var app = express();

app.use(express.static(__dirname + '/dist/'));
app.use(express.static(__dirname + '/img/'));

app.listen(process.env.PORT || 8080);
console.log('Listening on port: ' + process.env.PORT);
