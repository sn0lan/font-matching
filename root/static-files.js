var fs = require('fs');
module.exports = function(filename, res) {

    fs.createReadStream(filename)
        .on('data', function(chunk) {
            res.write(chunk)
        })
        .on('end', function() {
            res.end();
        });
}
