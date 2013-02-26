var fs = require('fs'),
    zip = require('zipfile'),
    http = require('http'),
    glob = require('glob'),
    fontlist = require('./fontsquirrel-fontlist');

/**
 * Find font by name (from fontsquirrel's family_urlname). Fetch and unzip the
 * font if necessary.
 *
 * fontname - name of font
 * cb(filename) - called back with filename of font file.
 */
function findfont(fontname, cb) {
    var zipfile = __dirname + '/font-cache/' + fontname + '.zip',
        fontglob = __dirname + '/font-cache/' + fontname + '/*';

    var files = glob.sync(fontglob);
    var fontinfo = fontlist[fontname];

    if (!fontinfo) {
        throw ["Unknown font: " + fontname];
    }
    
    // FIXME - I'm sure I could structure this better but it works for now
    if (! files || ! files.length) {
        try {
            unzip(zipfile);
            findfont(fontname, cb);
        }
        catch (e) {
            if (e.code && e.code == 'ENOENT') {
                getfont(fontname, zipfile, unzip);
                findfont(fontname, cb);
            }
            else {
                console.log(e);
                throw e;
            }
        }
    }
    else {
        cb(files[0]);
    }
}

function unzip(zipfile) {
    console.log('Unzip ' + zipfile);
    // This throws an exception with ENOENT, so we can catch it.
    fs.statSync(zipfile);

    var zf = new zip.ZipFile(zipfile);
    var fontsdir = zipfile.replace(/\.zip$/, '');
    fs.mkdirSync(fontsdir);

    zf.names.forEach(function(it) {
        if(it.match(/(ttf|woff|eot|svg)$/)) {
            fs.writeFileSync(fontsdir + '/' + it, zf.readFileSync(it));
        }
    });
}

function getfont(fontname, save_to, cb){
    console.log('Fetch ' + fontname);
    http.get('http://www.fontsquirrel.com/fontfacekit/' + fontname, function(res) {
        var outfile = fs.createWriteStream(save_to);
        res.on('data', function(chunk) {
            outfile.write(chunk);
        });
        res.on('end', function() {
            outfile.end();
            cb(save_to);
        });
    });
}

module.exports = {
    findfont: findfont
}
