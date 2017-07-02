'use strict';

var mv = require('mv');
var fs = require('fs');
var path = require('path');

var mkdir = function mkdir(folderPath) {
  try {
    fs.mkdirSync(folderPath);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw new Error('Error occurred while creating a new directory');
    }
  }
};

var getExtension = function getExtension(fileName) {
  var i = fileName.lastIndexOf('.');
  return i < 0 ? '' : fileName.substr(i + 1);
};

var getFileNames = function getFileNames(directory) {
  return fs.readdirSync(directory);
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

module.exports = {
  mkdir: mkdir,
  getExtension: getExtension,
  getFileNames: getFileNames,
  organize: organize
};