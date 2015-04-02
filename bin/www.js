var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// routes
var r_encoder = require('../routes/encoder');
app.use('/encode',r_encoder);

var r_decoder = require('../routes/decoder');
app.use('/decode',r_decoder);

// error handling
app.use(function(req,res){
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not found');
});

app.use(function(err, req, res, next){
	log(null,'ERROR:' + req.path + ' ' +err.message);
	res.status(500);
	res.send({ status: 500, message: err.message });
});

exports.start = function() {

	app.listen(app.get('port'),function(){
		log(null,'Server up and running on http://127.0.0.1:' + app.get('port'));
	});
};
