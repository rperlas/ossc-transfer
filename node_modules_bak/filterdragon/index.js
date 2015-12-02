var fs = require('graceful-fs');

exports.filterArray = function (fil, loc, name) {

	// Output Variables
	var output = fs.readFileSync(loc, 'utf-8').split('\n');
	var newOut = [];
	var count = 0;

	// Filter Variables
	var fpack = require(fil);
	var fdeps = fpack.dependencies;
	var fdepStr = JSON.stringify(fdeps);
	var filter = fdepStr.substring(1, fdepStr.length - 1).split(",");


	for (var x = 0; x < filter.length; x++) {
		filter[x] = filter[x].split(':')[0];
		filter[x] = filter[x].substring(1, filter[x].length - 1);
	}

	for (var x = 0; x < output.length; x++) {
		output[x] = output[x].replace('@', ', ').substring(4, output[x].length + 1);
	}

	if (filter.length === 0) return output;

	for (var x = 0; x < output.length - 2; x++) {
		var scan = true;
		for (var y = 0; y < filter.length; y++) {
			if (output[x].split(',')[0] === filter[y]) scan = false;
		}
		if (scan === true) {
			fs.appendFileSync(name, output[x] + '\n');
			newOut[count] = output[x];
			count++;
		}
	}
	fs.appendFileSync(name, 'Total: ' + (count - 2) + '\n');
	newOut[count] = 'Total: ' + (count - 2);
	return newOut;
}

exports.filterText = function (fil, tail, loc) {

	// Output Variables
	var output = fs.readFileSync(loc + tail + '.txt', 'utf-8').split('\n');
	var newOut = [];
	var count = 0;

	// Filter Variables
	var fpack = require('../../' + fil);
	var fdeps = fpack.dependencies;
	var fdepStr = JSON.stringify(fdeps);
	var filter = fdepStr.substring(1, fdepStr.length - 1).split(",");

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
			fs.appendFileSync('./output/outputf' + tail + '.txt', output[x] + '\n');
			count++;
		}
	}
	return newOut;
}