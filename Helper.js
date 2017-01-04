'use strict';

const mv = require('mv');
const fs = require('fs');
const path = require('path');

class Helper {

  constructor() { }

  mkdir(path) {
    try {
      fs.mkdirSync(path);
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw new Error("Error occurred while creating a new directory");
      }
    }
  }

  getExtension(fileName) {
    let i = fileName.lastIndexOf('.');
    return (i < 0) ? '' : fileName.substr(i + 1);
  }

  getFileNames(directory) {
    return fs.readdirSync(directory);
  }

  organize(source, output, fileName, type) {
    this.mkdir(output);

    let typeDir = path.resolve(output, type);
    this.mkdir(typeDir);

    mv(path.resolve(source, fileName), path.resolve(typeDir, fileName), (err) => {
      if (err) {
        throw new Error("Couldn't move " + fileName + " because of following error: " + err);
      }
    });
  }
}

module.exports = Helper;
