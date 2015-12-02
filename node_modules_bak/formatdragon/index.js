var fs = require('graceful-fs');
var mkdirp = require('mkdirp');
var xel = require('exceldragon').countExcel;
var pdf = require('pdfdragon').pdfGen;
var jsn = require('jsondragon').jsonGen;

exports.formatArray = function (output, name) {

	xel(output, name);
	pdf(output, name);
	jsn(output, name);
} 

exports.formatOutput = function (tail, outfile) {

	var output = fs.readFileSync(outfile + tail + '.txt', 'utf-8').split('\n');

	for (var x = 0; x < output.length; x++) {
		output[x] = output[x].replace('@', ', ').substring(4, output[x].length + 1);
	}

	xel(output, tail);
	pdf(output, tail);
	jsn(output, tail);
}


exports.filterOutput = function (tail, filter) {

	var output = fs.readFileSync(outfile + tail + '.txt', 'utf-8').split('\n');
	var newOut = [];
	var count = 0;

	for (var x = 0; x < filter.length; x++) {
		filter[x] = filter[x].split(':')[0];
		filter[x] = filter[x].substring(1, filter[x].length - 1);
	}

	for (var x = 0; x < output.length; x++) {
		output[x] = output[x].replace('@', ', ').substring(4, output[x].length + 1);
	}


	for (var x = 0; x < output.length; x++) {
		var scan = true;
		for (var y = 0; y < filter.length; y++) {
			if (output[x].split(',')[0] === filter[y]) scan = false;
		}
		if (scan === true) {
			newOut[count] = output[x];
			count++;
		}
	}

	xel(newOut, tail);
	pdf(newOut, tail);
	jsn(newOut, tail);
}


exports.createFolder = function () {
	mkdirp('./output', function (err) {
	    if (err) console.error(err)
	    else console.log('Successfully created output folder!')
	});
}