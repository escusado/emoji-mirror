const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/dist/'));
app.use(express.static(__dirname + '/img/'));
app.use(express.static(__dirname + '/'));

app.listen(port);
console.log('Listening on port: ' + port);
