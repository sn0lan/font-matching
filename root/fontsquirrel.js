var fs = require('fs'),
    zip = require('zipfile'),
    http = require('http'),
    glob = require('glob');
//    fontlist = require('./fontsquirrel-fontlist');

/**
 * Find font by name (from fontsquirrel's family_urlname). Fetch and unzip the
 * font if necessary.
 *
 * fontname - name of font
 * cb(filename) - called back with filename of font file.
 */
function findfont(fontname, cb) {
    var fontglob = __dirname + '/font-cache/' + fontname + '/*';

    var files = glob.sync(fontglob);
    /*var fontinfo = fontlist[fontname];

    if (!fontinfo) {
        throw ["Unknown font: " + fontname];
    }*/
    
    // FIXME - I'm sure I could structure this better but it works for now
    if (! files || ! files.length) {
        unzip(fontname, findfont);
    }
    else {
        cb(files[0]);
    }
}

function unzip(fontname) {
    var zipfile = __dirname + '/font-cache/' + fontname + '.zip';
    console.log('Unzip ' + zipfile);

    function reallyunzip(filename) {
        console.log("Really unzip " + filename);
        var zf = new zip.ZipFile(filename);
        var fontsdir = filename.replace(/\.zip$/, '');
        fs.mkdirSync(fontsdir);

        console.log(zf);

        zf.names.forEach(function(it) {
            if(it.match(/(ttf|woff|eot|svg)$/)) {
                fs.writeFileSync(fontsdir + '/' + it, zf.readFileSync(it));
            }
        });
    }

    try {
        fs.statSync(zipfile);
        reallyunzip(zipfile);
    }
    catch (e) {
        if (e.code && e.code == 'ENOENT') {
            getfont(fontname, zipfile, reallyunzip);
        }
        else {
            console.log(e);
            throw e;
        }
    }
}

function getfont(fontname, save_to, cb){
    console.log('Fetch ' + fontname + ' to ' + save_to);
    http.get("http://www.fontsquirrel.com/fontfacekit/" + fontname, function(res) {
        var outfile = fs.createWriteStream(save_to);

        res.on('data', function(chunk) {
            outfile.write(chunk);
        });
        res.on('end', function() {
            outfile.end();
            cb(save_to);
        });
    })
    .on('error', function(e) {
        console.log('error ' + e.message);
    });
}

module.exports = {
    findfont: findfont
}
