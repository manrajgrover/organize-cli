'use strict';

var mv = require('mv');
var fs = require('fs');
var path = require('path');
var formats = require('./formats');

var isValidFile = function isValidFile(name, dir) {
  return name.indexOf('.') !== 0 && !fs.statSync(path.join(dir, name)).isDirectory();
};

var mkdir = function mkdir(folderPath) {
  try {
    fs.mkdirSync(folderPath);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw new Error('Error occurred while creating a new directory');
    }
  }
};

var getFileExtension = function getFileExtension(fileName) {
  var i = fileName.lastIndexOf('.');
  return i < 0 ? '' : fileName.substr(i + 1);
};

var organize = function organize(spinner, source, output, fileName, type) {
  mkdir(output);

  var typeDir = path.resolve(output, type);
  mkdir(typeDir);

  return new Promise(function (resolve, reject) {
    mv(path.resolve(source, fileName), path.resolve(typeDir, fileName), function (err) {
      if (err) {
        var errorMessage = 'Couldn\'t move ' + fileName + ' because of following error: ' + err;
        spinner.warn(errorMessage);
        reject(new Error(errorMessage));
      } else {
        var successMessage = 'Moved ' + fileName + ' to ' + type + ' folder';
        spinner.info(successMessage);
        resolve(successMessage);
      }
    });
  });
};

var organizeByDefaults = function organizeByDefaults(names, sourceDir, outputDir, spinner) {
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

var organizeBySpecificFileTypes = function organizeBySpecificFileTypes(spFormats, spFolder, files, sourceDir, outputDir, spinner) {
  var names = files.filter(function (name) {
    if (!isValidFile(name, sourceDir)) {
      return false;
    }

    var extension = getFileExtension(name);
    return spFormats.indexOf(extension) !== -1;
  });

  var moved = [];

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

module.exports = {
  mkdir: mkdir,
  getFileExtension: getFileExtension,
  organize: organize,
  organizeByDefaults: organizeByDefaults,
  organizeBySpecificFileTypes: organizeBySpecificFileTypes
};