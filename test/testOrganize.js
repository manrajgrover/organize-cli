/* eslint-env mocha */
const assert = require('assert');
const process = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const helpers = require('../src/helpers');

const TESTING_FOLDER = path.join(__dirname, '..', 'testing');

const rmDir = (dirName) => {
  let files;
  try {
    files = fs.readdirSync(dirName);
  } catch (e) {
    console.log(`Couldn't create directory because of error: ${e}`);
    process.exit(-1);
  }
  if (files.length > 0) {
    for (let i = 0; i < files.length; i += 1) {
      let filePath = path.join(dirName, files[i]);
      if (fs.statSync(filePath).isDirectory()) {
        fs.remove(filePath);
      }
    }
  }
};

describe('Organize Files', () => {
  beforeEach(() => {
    rmDir(TESTING_FOLDER);
  });

  it('should organize files', () => {
    assert(1);
  });
});
