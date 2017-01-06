'use strict';

const mv = require('mv');
const fs = require('fs');
const path = require('path');

const mkdir = (path) => {
  try {
    fs.mkdirSync(path);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw new Error("Error occurred while creating a new directory");
    }
  }
}

const getExtension = (fileName) => {
  let i = fileName.lastIndexOf('.');
  return (i < 0) ? '' : fileName.substr(i + 1);
}

const getFileNames = (directory) => {
  return fs.readdirSync(directory);
}

const organize = (source, output, fileName, type) => {
  mkdir(output);

  let typeDir = path.resolve(output, type);
  mkdir(typeDir);

  mv(path.resolve(source, fileName), path.resolve(typeDir, fileName), (err) => {
    if (err) {
      throw new Error("Couldn't move " + fileName + " because of following error: " + err);
    }
  });
}

module.exports = {
  getExtension,
  getFileNames,
  organize
}
