/* Pdfdragon Library File
 * A module to create a pdf file containing node dependencies.
 */

var fs = require('graceful-fs');
var PDFDocument = require('pdfkit');

exports.pdfGen = function (output, name) {

	doc = new PDFDocument();
	doc.pipe( fs.createWriteStream(name + '.pdf') );

/*
doc.moveTo(300, 75)
   .lineTo(373, 301)
   .lineTo(181, 161)
   .lineTo(419, 161)
   .lineTo(227, 301)
   .fill('blue', 'even-odd');  
*/

	doc.y = 100;
	doc.fillColor('red')
	doc.text("Module Names", {
   		paragraphGap: 10,
   		indent: 20,
   		align: 'justify',
	});  

   for (var x = 1; x < output.length - 1; x++) {

      if (typeof output[x + 1].split(',')[1] === 'undefined') {
         output[x + 1] = output[x + 1].split(',')[0] + ', ';
      }
      
      doc.fillColor('blue');
      doc.text(output[x + 1].split(',')[0] + '\n   ' + output[x + 1].split(',')[1], {
            paragraphGap: 10,
            indent: 30,
            align: 'justify',
      });  
   }

	doc.end();
}