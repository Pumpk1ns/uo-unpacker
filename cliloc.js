/**
 * cliloc.{language-tag} file format
 * It is a relatively simple string array.
 *
 * First 6 bytes of file is unknown. (Version maybe?)
 * After 6th byte, each block contains:
 *     int locID
 *     int16 locLength
 *     [locLength] utf8 encoded string
 */

var fs = require('fs');

fs.readFile('cliloc.enu', function(err, buffer) {
    if (err) throw err;

    var pos = 6;
    var count = buffer.length;

    while (pos < count) {
        var number = buffer.readInt32LE(pos);
        var length = buffer.readInt16LE(pos + 5);
        var string = buffer.toString('utf8', pos + 7, pos + 7 + length);
        pos = pos + 7 + length;
        console.log(number + ", " + length + ", " + string);
    }
});