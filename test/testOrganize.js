/* eslint-env mocha */
const assert = require('assert');
const process = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const { mkdir } = require('../src/helpers');
const formats = require('../src/formats');
const shell = require('shelljs');

const TESTING_FOLDER = path.join(__dirname, '..', 'testing');

const removeDirsFromFolder = (dirName) => {
  let files;
  try {
    files = fs.readdirSync(dirName);
  } catch (e) {
    console.log(`Couldn't read directory because of error: ${e}`);
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
    mkdir(TESTING_FOLDER);
    removeDirsFromFolder(TESTING_FOLDER);

    for (let folderType of Object.keys(formats)) {
      for (let fileType of formats[folderType]) {
        fileType = fileType.toLowerCase();
        fs.writeFileSync(path.join(TESTING_FOLDER, `test.${fileType}`), '');
      }
    }

    // Some Miscellaneous files
    fs.writeFileSync(path.join(TESTING_FOLDER, 'test'), '');
    fs.writeFileSync(path.join(TESTING_FOLDER, 'test.apib'), '');
    fs.writeFileSync(path.join(TESTING_FOLDER, 'test.ai'), '');
    fs.writeFileSync(path.join(TESTING_FOLDER, 'test.log'), '');

    if (!shell.which('organize')) {
      throw new Error('organize command not found');
    }
  });

  it('should organize files', () => {
    shell.exec(`organize files -s ${TESTING_FOLDER} -o ${TESTING_FOLDER}`, (status, output) => {
      console.log('Exit status:', status);
      console.log('Program output:', output);
    });
  });
});
