'use strict';

var fs = require('fs');
var path = require('path');

// utils

var ordinalRegExp = /^\d+(.*)/;
var removeOrdinal = function(str) {
  var m = str.match(ordinalRegExp);
  return (!m) ? str : m[1].trim();
};

var stripTrailingSlash = function(str) {
  return str.replace(/\/$/, '');
};

module.exports = function(fileToMove, position, fileToReach, dir) {
  dir = dir || process.cwd();
  // slashes are added on dirs by bash autocompletion
  fileToMove = stripTrailingSlash(fileToMove);
  fileToReach = stripTrailingSlash(fileToReach);

  console.log('move', fileToMove, position, fileToReach, 'in', dir);

  // iterate and rename
  fs.readdir(dir, function(err, files) {
    if (err) throw err;
    var fileToMoveIndex = files.indexOf(fileToMove);
    if (fileToMoveIndex === -1) {
      throw new Error('File ' + fileToMove + ' to move does not exist');
    }
    files.splice(fileToMoveIndex, 1);

    var fileToReachIndex = files.indexOf(fileToReach);
    if (fileToMoveIndex === -1) {
      throw new Error('File ' + fileToReach + ' to reach does not exist');
    }
    var insertIndex = position === 'after' ? fileToReachIndex + 1 : fileToReachIndex;
    files.splice(insertIndex, 0, fileToMove);

    var padding = String(files.length).length;
    files.forEach(function(file, i) {
      var newIndex = `${i + 1}`.padStart(padding, '0');
      var gist = removeOrdinal(file);
      var newFile = newIndex + ' ' + gist;
      fs.rename(path.join(dir, file), path.join(dir, newFile), function(err) {
        if (err) throw err;

        console.log('renamed', file, '->', newFile);
      });
    });
  });
};
