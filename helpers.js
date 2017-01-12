'use strict';

const mv = require('mv');
const fs = require('fs');
const path = require('path');

const mkdir = (folderPath) => {
  try {
    fs.mkdirSync(folderPath);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw new Error('Error occurred while creating a new directory');
    }
  }
};

const getExtension = (fileName) => {
  const i = fileName.lastIndexOf('.');
  return (i < 0) ? '' : fileName.substr(i + 1);
};

const getFileNames = directory => fs.readdirSync(directory);

const organize = (source, output, fileName, type) => {
  mkdir(output);

  const typeDir = path.resolve(output, type);
  mkdir(typeDir);

  mv(path.resolve(source, fileName), path.resolve(typeDir, fileName), (err) => {
    if (err) {
      const errorMessage = `Couldn't move ${fileName} because of following error: ${err}`;
      throw new Error(errorMessage);
    }
  });
};

module.exports = {
  getExtension,
  getFileNames,
  organize,
};
