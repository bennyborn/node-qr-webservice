var express = require('express');
var router = express.Router();
var child_process = require('child_process');
var fs = require('fs');
var request = require('request');

download = function( uri, filename, callback ) {

	request.head(uri, function(err, res, body) {
    	var r = request(uri).pipe(fs.createWriteStream(filename));
    	r.on('close', callback);
	});
};

router.get('/', function(req, res) {

    var image = Object.keys(req.query)[0];

	var unique = process.hrtime();
	var tempName = unique[1]+'.'+unique[0];

	download( image, tempName, function(){

		var zbar = child_process.exec('zbarimg "'+tempName+'" --raw', function (error, stdout, stderr) {

			fs.unlink(tempName);

			if (error) {
				log( req, image, { status: 500, message: 'unknown error occured' });
				res.send({ status: 500, message: 'unknown error occured' });
			}

			var re = /QR-Code:(.*?)(\s|$)/;

			if( (m = re.exec(stdout)) !== null ) {
			    if( m.index === re.lastIndex ) {
			        re.lastIndex++;
			    }

				log(req, image, { status: 200, qrcode: m[1] });
				res.send({ status: 200, qrcode: m[1] });
			}
		});
	});
});

module.exports = router;
