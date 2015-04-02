var server = require('./bin/www');
var util = require('util');
var strftime = require('strftime');

global.log = function(req,msg,data) {

	var time = strftime('%y-%m-%d %H:%M:%S');
	process.stdout.write('['+time+'] ');

	if( req ) {
		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		process.stdout.write('['+ip+'] ');
		process.stdout.write(req.baseUrl+req.route.path+': ');
	}

	if( msg ) {
		process.stdout.write(msg+' ');
	}

	if( data ) {
		process.stdout.write(util.inspect(data,false,null));
	} else {
		if( req ) {
			process.stdout.write(util.inspect(req.params,false,null));
		}
	}

	process.stdout.write('\n');
};

server.start();
