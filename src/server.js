var express =require('express');
var fs = require('fs')
var rewrite = require('express-urlrewrite')

var path = require('path')
var server = express();

server.use(rewrite('/', '/index.html'));

server.use(express.static(__dirname+'/public'))

server.listen(8080, function () {
  console.log('Server listening on http://localhost:8080, Ctrl+C to stop')
});