#!/usr/bin/env node


'use strict';

var yargs = require('yargs');
var chalk = require('chalk');
var fs = require('fs');
var formats = require('./formats');
var path = require('path');
var ora = require('ora');

var _require = require('./helpers'),
    getFileNames = _require.getFileNames,
    getExtension = _require.getExtension,
    organize = _require.organize;

var argv = yargs.usage('organize <command>').command('files', 'Organizes current directory', function (yargsFiles) {
  var argvFiles = yargsFiles.usage('Usage: $0 files [options]').alias('o', 'output').describe('o', 'Output directory - Creates one if doesn\'t exist ').string('o').alias('s', 'source').describe('s', 'Source directory to organize').string('s').example('$0 files -s ~/Downloads -o .').argv;

  var spinner = ora('Scanning').start();

  var sourceDirectory = argvFiles.source ? path.resolve(process.cwd(), argvFiles.source) : process.cwd();
  var outputDirectory = argvFiles.output ? path.resolve(process.cwd(), argvFiles.output) : sourceDirectory;

  var fileNames = getFileNames(sourceDirectory);

  var movedFiles = [];

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = fileNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var fileName = _step.value;

      if (fileName.indexOf('.') !== 0 && !fs.statSync(path.join(sourceDirectory, fileName)).isDirectory()) {
        var fileExtension = getExtension(fileName).toUpperCase();
        var isMoved = false;

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = Object.keys(formats)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var fileType = _step3.value;

            if (formats[fileType].indexOf(fileExtension) >= 0) {
              spinner.info('Moving file ' + fileName + ' to ' + fileType);
              movedFiles.push(organize(spinner, sourceDirectory, outputDirectory, fileName, fileType));
              isMoved = true;
              break;
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        if (!isMoved) {
          spinner.info('Moving file ' + fileName + ' to Miscellaneous');
          movedFiles.push(organize(spinner, sourceDirectory, outputDirectory, fileName, 'Miscellaneous'));
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  Promise.all(movedFiles.map(function (p) {
    return p.catch(function (e) {
      return e;
    });
  })).then(function (messages) {
    var isError = false;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = messages[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var message = _step2.value;

        if (message instanceof Error) {
          spinner.fail("Couldn't move all files!");
          isError = true;
          break;
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    if (!isError) {
      spinner.succeed('Moved all files!');
    }
  }).catch(function (err) {
    return spinner.fail('An error occured!');
  });
}).help('h').alias('h', 'help').argv;