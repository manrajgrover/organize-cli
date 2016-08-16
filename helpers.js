/*
* @Author: Manraj Singh
* @Date:   2016-08-13 20:28:25
* @Last Modified by:   Manraj Singh
* @Last Modified time: 2016-08-16 21:02:42
*/

'use strict';

const mv = require('mv');
const fs = require('fs');
const path = require('path');

const mkdir = (path) => {
  try {
    fs.mkdirSync(path);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw new Error("Error occurred while creating a new directory");
    }
  }
}

const helpers = {
  getExtension: (fileName) => {
    let i = fileName.lastIndexOf('.');
    return (i < 0) ? '' : fileName.substr(i + 1);
  },
  getFileNames: (directory) => {
    return fs.readdirSync(directory);
  },
  organize: (directory, fileName, type) => {
    let dir = path.resolve(directory, type);
    mkdir(dir);
    mv(path.resolve(directory, fileName), path.resolve(dir, fileName), function (err) {
      if (err) {
        throw new Error("Couldn't move " + fileName + " because of following error: " + err);
      }
    });
  }
};

module.exports = helpers;
