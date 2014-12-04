'use strict';

var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
var expect = require('chai').expect;
var newOrder = require('../');

console.log('create initial set of files');

var BOOK_DIR = __dirname + '/rainbow/';

// clean state
rimraf(BOOK_DIR, function() {
  // populate initial collection of documents
  fs.mkdir(BOOK_DIR, function(err) {
    if (err) throw err;
    // alpha list
    var files = [
      'blue.md',
      'brown.md',
      'green.md',
      'pink.md',
      'red.md',
      'yellow.md'
    ];
    files.forEach(function(file) {
      fs.writeFileSync(path.join(BOOK_DIR + file), 'dummy');
    });
    fs.mkdirSync(path.join(BOOK_DIR + 'shades of grey'));

    newOrder('yellow.md', 'before', 'green.md', BOOK_DIR);

    // TODO write correct async tests
    setTimeout(function() {
      newOrder('1 blue.md', 'after', '5 pink.md', BOOK_DIR);

      setTimeout(function() {
        newOrder('4 pink.md', 'before', '6 red.md', BOOK_DIR);

        setTimeout(function() {

          // dir support
          setTimeout(function() {
            newOrder('7 shades of grey', 'before', '2 yellow.md', BOOK_DIR);

            setTimeout(function() {
              var results = fs.readdirSync(BOOK_DIR);
              var expected = [
                '1 brown.md',
                '2 shades of grey',
                '3 yellow.md',
                '4 green.md',
                '5 blue.md',
                '6 pink.md',
                '7 red.md'
              ];
              console.log(results, expected);
              expect(results).to.deep.equal(expected);
            }, 1000);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  });
});
