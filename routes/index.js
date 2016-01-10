var express = require('express'),
    router = express.Router(),
    Busboy = require('busboy'),
    path = require('path'),
    os = require('os'),
    fs = require('fs'),
    inspect = require('util').inspect;
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.use('/upload', function(req, res, next) {

    var busboy = new Busboy({
        headers: req.headers
    });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        var saveTo = path.join(os.tmpDir(), path.basename(fieldname));
        console.log(saveTo);
        file.pipe(fs.createWriteStream(saveTo));
    });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
        console.log('Field [' + fieldname + ']: value: ' + inspect(val));
    });
    busboy.on('finish', function() {
        console.log('Done parsing form!');
        res.json('upload successful! ');
    });
    req.pipe(busboy);

})

module.exports = router;
