var express = require('express');
var router = express.Router();
var encoder = require('qr-image');

router.get('/:format/:data', function(req, res) {

	// format validation
	if( ['png','svg','eps','pdf'].indexOf(req.params.format.toLowerCase()) == -1 ) {
		log( req, null, { status: 500, message: 'invalid format' });
		res.send({ status: 500, message: 'invalid format' });
		return;
	}

	log(req);

	var code = encoder.image(
		req.params.data,
		{ type: req.params.format }
	);

	res.type(req.params.format);
	code.pipe(res);
});

router.get('/:format/:ecl/:data', function(req, res) {

	// format validation
	if( ['png','svg','eps','pdf'].indexOf(req.params.format.toLowerCase()) == -1 ) {
		log( req, null, { status: 500, message: 'invalid format' });
		res.send({ status: 500, message: 'invalid format' });
		return;
	}

	// ecl validation
	if( ['L','M','Q','H'].indexOf(req.params.ecl.toUpperCase()) == -1 ) {
		log( req, null, { status: 500, message: 'invalid error correction level' });
		res.send({ status: 500, message: 'invalid error correction level' });
		return;
	}

	log(req);

	var code = encoder.image(
		req.params.data,
		{
			ec_level: req.params.ecl.toUpperCase(),
			type: req.params.format
		}
	);

	res.type(req.params.format);
	code.pipe(res);
});

module.exports = router;
