/*
* @Author: Manraj Singh
* @Date:   2016-08-13 20:28:25
* @Last Modified by:   Manraj Singh
* @Last Modified time: 2016-08-13 20:44:16
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

module.exports.getExtension = (fileName) => {
  let i = fileName.lastIndexOf('.');
  return (i < 0) ? '' : fileName.substr(i + 1);
}

module.exports.organizeiT = (directory, fileName, type) => {
  let dir = path.resolve(directory, 'Organize_' + type);
  mkdir(dir);
  mv(path.resolve(process.cwd(), fileName), path.resolve(dir, fileName), function (err) {
    if (err) {
      throw new Error("Couldn't move " + fileName + " because of following error: " + err);
    }
  });
}
