var fs = require('fs');
var http = require('http');
var router = require('router')();

var fontsquirrel = require('./fontsquirrel'),
    static_files = require('./static-files');

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
)
.get('/{area}/*', function(req, res){
    var area = req.params.area;
    var etc = req.params.wildcard;

    static_files(__dirname + '/../' + area + '/' + etc, res);
})
.get('/', function(req, res) {
    static_files(__dirname + '/../index.html', res);
});

http.createServer(router).listen(8080);
