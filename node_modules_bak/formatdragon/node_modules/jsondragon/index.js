/* Jsondragon Library File
 * A module to create a pdf file containing node dependencies.
 */
var fs = require('graceful-fs');

exports.jsonGen = function (output, name) {
   fs.appendFileSync(name + '.json', '{' + '\n');
   fs.appendFileSync(name + '.json', '  "name": "output",' + '\n');
   fs.appendFileSync(name + '.json', '  "dependencies": {' + '\n');


   for (var x = 1; x < output.length - 2; x++) {

      var depName = output[x + 1].split(',')[0];
      var depVer = output[x + 1].split(',')[1];

      fs.appendFileSync (name + '.json', '    "' + depName + '"' + ': "' + depVer + '",\n');
   }

   var total = output[output.length - 1].split(',')[0];
   fs.appendFileSync(name + '.json', '    "' + total + '": "*"\n');
   fs.appendFileSync(name + '.json', '  }' + '\n' + '}');

}