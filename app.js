var format = require('formatdragon');
var filter = require('filterdragon');
var depend = require('dependency-tracker');
var async = require('async');
var tail = Math.floor((Math.random() * 1000) + 1); 


async.series ([
	function (callback) {
		format.createFolder();
		// Note: depTracker (packageToScan, typeOfTracking, nameOfOutputFile, callback)
	
        //generate all prodcution dependencies -(exclude dev depedencies)
	depend.depTracker(__dirname + '/strongloop-product-v1.json', "version-nocut", './output/strongloop-dep-v1-' + tail + '.txt', callback);
	}],
	function (err, results) {
        console.log("tail = " + tail);
        //filter out a list (alresdy bluewashed modules e.g. strongloop products)
        //Note: filterArray(nameOfFilter, packageToFilter, nameOfFilteredOutput)
		var output = filter.filterArray(__dirname + '/filter.json', __dirname + '/output/strongloop-dep-v1-' + tail + '.txt', './output/strongloop-dep-v1-filter' + tail + '.txt');
		//Note: formatArray(inputToFilter, nameOfFormattedOutput)
		//generate a final formatted output with different formats
		//xsls, pdf and json
		format.formatArray(output, './output/strongloop-dep-v1-' + tail);
	} );
