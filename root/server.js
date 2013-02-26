var fs = require('fs');
var http = require('http');
var router = require('router')();

var fontsquirrel = require('./fontsquirrel');

router.get(
    '/font/{font}', function(req, res) {
        fontsquirrel.findfont(req.params.font, function(filename) {
            fs.createReadStream(filename).on('data', function(chunk){
                res.write(chunk);
            }).on('end', function() {
                res.end();
            });
        });
    }
);

http.createServer(router).listen(8080);
