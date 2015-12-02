var xel = require('xlsx');
var fs = require('graceful-fs');

exports.countExcel = function (output, name) {

var moduleNames = [];
for (var x = 0; x < output.length - 1; x++) {
	moduleNames[x] = [];
	if (x === 0) {
		moduleNames[x][0] = "Module Name";
	}
	else {
		moduleNames[x][0] = output[x + 1].split(',')[0];
		moduleNames[x][1] = output[x + 1].split(',')[1];
	}
}


// Initializing Workbook 
var wb = {};
var wsCols = [ {wch: 20}, {wch: 12} ];
wb.Sheets = {};
wb.Props = {};
wb.SSF = {};
wb.SheetNames = [];


// Initializing Worksheet
var wsName = "SheetJS";
var ws = [];
var range = {s: {c:0, r:0}, e: {c:0, r:0 }};

for(var x = 0; x < moduleNames.length; x++) {
  	if(range.e.r < x) range.e.r = x;
	for (var y = 0; y < moduleNames[x].length; y++) {
		if(range.e.c < y) range.e.c = y;
		var cellVal = { v: moduleNames[x][y] };
		var cellRef = xel.utils.encode_cell({c: y, r: x});
		if(typeof cellVal.v === 'number') cellVal.t = 'n';
    	else cellVal.t = 's';
    	ws[cellRef] = cellVal;
    }
}

// Generating Excel Sheet
ws['!cols'] = wsCols;
ws['!ref'] = xel.utils.encode_range(range);
wb.SheetNames.push(wsName);
wb.Sheets[wsName] = ws;
xel.writeFile(wb, name + '.xlsx');

}
