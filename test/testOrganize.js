/* eslint-env mocha */
const assert = require('assert');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const { mkdir } = require('../src/helpers');
const formats = require('../src/formats');
const syncExec = require('sync-exec');
const commandExistsSync = require('command-exists').sync;

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
        fse.remove(filePath);
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

    if (!commandExistsSync('organize')) {
      throw new Error('Command "organize" command not found');
    }
  });

  it('should organize files', () => {
    syncExec(`organize files -s ${TESTING_FOLDER}`);

    for (let folderType of Object.keys(formats)) {
      for (let fileType of formats[folderType]) {
        fileType = fileType.toLowerCase();
        assert(fs.existsSync(path.join(TESTING_FOLDER, folderType, `test.${fileType}`)));
      }
    }
  });
});
