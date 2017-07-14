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
    getFileExtension = _require.getFileExtension,
    organize = _require.organize;

var isValidFile = function isValidFile(name, dir) {
  return name.indexOf('.') !== 0 && !fs.statSync(path.join(dir, name)).isDirectory();
};

var moveUsingFormatsConfig = function moveUsingFormatsConfig(names, sourceDir, outputDir, spinner) {
  var moved = [];

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = names[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var name = _step.value;

      if (isValidFile(name, sourceDir)) {
        var extension = getFileExtension(name).toUpperCase();
        var isMoved = false;

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = Object.keys(formats)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var type = _step2.value;

            if (formats[type].indexOf(extension) >= 0) {
              spinner.info('Moving file ' + name + ' to ' + type);

              var pOrganize = organize(spinner, sourceDir, outputDir, name, type);

              moved.push(pOrganize);
              isMoved = true;
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

        if (!isMoved) {
          spinner.info('Moving file ' + name + ' to Miscellaneous');
          moved.push(organize(spinner, sourceDir, outputDir, name, 'Miscellaneous'));
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

  return moved;
};

var moveSpecificFileTypes = function moveSpecificFileTypes(spFormats, spFolder, fileNames, sourceDir, outputDir, spinner) {
  var names = fileNames.filter(function (name) {
    if (!isValidFile(name, sourceDir)) {
      return false;
    }

    var extension = getFileExtension(name);
    return spFormats.indexOf(extension) !== -1;
  });

  var moved = [];
  console.log(moved);

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = names[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var name = _step3.value;

      spinner.info('Moving file ' + name + ' to ' + spFolder);

      var pOrganize = organize(spinner, sourceDir, outputDir, name, spFolder);
      moved.push(pOrganize);
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

  return moved;
};

var argv = yargs.usage('Usage: $0 [options]').alias('o', 'output').describe('o', "Output directory - Creates one if doesn't exist").string('o').alias('s', 'source').describe('s', 'Source directory to organize').string('s').alias('t', 'type').describe('t', 'Specific types to organize - comma separated string of file extensions').string('t').alias('f', 'folder').describe('f', 'Specific folder to move specific files to').string('f').example('$0 -s ~/Downloads -o . -t "mp3, wav" -f "Songs"').help('h').alias('h', 'help').argv;

if (!argv.source) {
  console.log(chalk.cyan('Please provide a source, do a `organize -h` for help'));
  process.exit(-1);
}

var spinner = ora('Scanning').start();

var sourceDir = argv.source ? path.resolve(process.cwd(), argv.source) : process.cwd();
var outputDir = argv.output ? path.resolve(process.cwd(), argv.output) : sourceDir;

var names = getFileNames(sourceDir);
var moved = [];

if (argv.t && argv.f) {
  var spFormats = argv.t.split(',').map(function (ext) {
    return ext.trim();
  });
  var spFolder = argv.f;

  moved = moveSpecificFileTypes(spFormats, spFolder, names, sourceDir, outputDir, spinner);
} else {
  moved = moveUsingFormatsConfig(names, sourceDir, outputDir, spinner);
}

Promise.all(moved.map(function (p) {
  return p.catch(function (e) {
    return e;
  });
})).then(function (messages) {
  var isError = false;
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = messages[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var message = _step4.value;

      if (message instanceof Error) {
        spinner.fail("Couldn't move all files!");
        isError = true;
        break;
      }
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4.return) {
        _iterator4.return();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  if (!isError) {
    spinner.succeed('Moved all files!');
  }
}).catch(function (err) {
  return spinner.fail('An error occured!');
});