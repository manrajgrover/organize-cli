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

    mkdir(SOURCE_FOLDER);
    mkdir(OUTPUT_FOLDER);

    for (let folderType of Object.keys(formats)) {
      for (let fileType of formats[folderType]) {
        fileType = fileType.toLowerCase();
        const FILE_NAME = `test.${fileType}`;
        fs.writeFileSync(path.join(SOURCE_FOLDER, FILE_NAME), '');
      }
    }

    // Some Miscellaneous files in source
    fs.writeFileSync(path.join(SOURCE_FOLDER, 'test'), '');
    fs.writeFileSync(path.join(SOURCE_FOLDER, 'test.apib'), '');
    fs.writeFileSync(path.join(SOURCE_FOLDER, 'test.ai'), '');
    fs.writeFileSync(path.join(SOURCE_FOLDER, 'test.log'), '');

    // Some Miscellaneous files in source
    fs.utimesSync(path.join(SOURCE_FOLDER, 'test'), '1499599912', '1499599912');
    fs.utimesSync(path.join(SOURCE_FOLDER, 'test.apib'), '1499699912', '1499699912');
    fs.utimesSync(path.join(SOURCE_FOLDER, 'test.ai'), '1499299912', '1499299912');
    fs.utimesSync(path.join(SOURCE_FOLDER, 'test.log'), '1499399912', '1499399912');

    if (!commandExistsSync('organize')) {
      throw new Error('Command "organize" command not found');
    }
  });

  it('should throw error for missing args', () => {
    const stderr = syncExec('organize').stderr;

    assert.notEqual(stderr, '');
    assert(stderr.includes('Missing required argument: s'));
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

  it('should organize files with specific file type', () => {
    syncExec(`organize -s ${SOURCE_FOLDER} -o ${OUTPUT_FOLDER} -t ai 3gp -f misc`);

    assert(fs.existsSync(path.join(OUTPUT_FOLDER, 'misc', 'test.ai')));
    assert(fs.existsSync(path.join(OUTPUT_FOLDER, 'misc', 'test.3gp')));
  });

  it('should organize files by dates', () => {
    syncExec(`organize -s ${SOURCE_FOLDER} -o ${OUTPUT_FOLDER} -d`);

    assert(fs.existsSync(path.join(OUTPUT_FOLDER, '2017-07-06', 'test.ai')));
    assert(fs.existsSync(path.join(OUTPUT_FOLDER, '2017-07-07', 'test.log')));
    assert(fs.existsSync(path.join(OUTPUT_FOLDER, '2017-07-09', 'test')));
    assert(fs.existsSync(path.join(OUTPUT_FOLDER, '2017-07-10', 'test.apib')));
  });
});
