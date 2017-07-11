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

const SOURCE_FOLDER = path.join(TESTING_FOLDER, 'source');
const OUTPUT_FOLDER = path.join(TESTING_FOLDER, 'output');

const removeDirsFromFolder = async (dirName) => {
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

    mkdir(SOURCE_FOLDER);
    mkdir(OUTPUT_FOLDER);

    for (let folderType of Object.keys(formats)) {
      for (let fileType of formats[folderType]) {
        fileType = fileType.toLowerCase();
        fs.writeFileSync(path.join(SOURCE_FOLDER, `test.${fileType}`), '');
      }
    }

    // Some Miscellaneous files in source
    fs.writeFileSync(path.join(SOURCE_FOLDER, 'test'), '');
    fs.writeFileSync(path.join(SOURCE_FOLDER, 'test.apib'), '');
    fs.writeFileSync(path.join(SOURCE_FOLDER, 'test.ai'), '');
    fs.writeFileSync(path.join(SOURCE_FOLDER, 'test.log'), '');

    if (!commandExistsSync('organize')) {
      throw new Error('Command "organize" command not found');
    }
  });

  it('should organize files with source', () => {
    syncExec(`organize -s ${SOURCE_FOLDER}`);

    for (let folderType of Object.keys(formats)) {
      for (let fileType of formats[folderType]) {
        fileType = fileType.toLowerCase();
        assert(fs.existsSync(path.join(SOURCE_FOLDER, folderType, `test.${fileType}`)));
      }
    }
  });

  it('should organize files with source and output folder', () => {
    syncExec(`organize -s ${SOURCE_FOLDER} -o ${OUTPUT_FOLDER}`);

    for (let folderType of Object.keys(formats)) {
      for (let fileType of formats[folderType]) {
        fileType = fileType.toLowerCase();
        assert(fs.existsSync(path.join(OUTPUT_FOLDER, folderType, `test.${fileType}`)));
      }
    }
  });
});
