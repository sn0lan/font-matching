var fs = require('fs');
var http = require('http');
var router = require('router')();

var fontsquirrel = require('./fontsquirrel');

router.get(
    '/font/{font}', function(req, res) {
        var m = req.params.font.match(/(.*)\.(.{3,4})$/);
        
        fontsquirrel.findfont(m[1], m[2], function(filename) {
            fs.createReadStream(filename).on('data', function(chunk){
                res.write(chunk);
            }).on('end', function() {
                res.end();
            });
        });
    }
);

http.createServer(router).listen(8080);
