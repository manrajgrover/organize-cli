'use strict';

const mv = require('mv');
const fs = require('fs');
const path = require('path');
const formats = require('./formats');

const isValidFile = (name, dir) => name.indexOf('.') !== 0 && !fs.statSync(path.join(dir, name)).isDirectory();

const mkdir = (folderPath) => {
  try {
    fs.mkdirSync(folderPath);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw new Error('Error occurred while creating a new directory');
    }
  }
};

const getFileExtension = (fileName) => {
  const i = fileName.lastIndexOf('.');
  return (i < 0) ? '' : fileName.substr(i + 1);
};

const organize = (spinner, source, output, fileName, type) => {
  mkdir(output);

  const typeDir = path.resolve(output, type);
  mkdir(typeDir);

  return new Promise((resolve, reject) => {
    mv(path.resolve(source, fileName), path.resolve(typeDir, fileName), (err) => {
      if (err) {
        const errorMessage = `Couldn't move ${fileName} because of following error: ${err}`;
        spinner.warn(errorMessage);
        reject(new Error(errorMessage));
      } else {
        const successMessage = `Moved ${fileName} to ${type} folder`;
        spinner.info(successMessage);
        resolve(successMessage);
      }
    });
  });
};

const moveUsingFormatsConfig = (names, sourceDir, outputDir, spinner) => {
  const moved = [];

  for (let name of names) {
    if (isValidFile(name, sourceDir)) {
      const extension = getFileExtension(name).toUpperCase();
      let isMoved = false;

      for (let type of Object.keys(formats)) {
        if (formats[type].indexOf(extension) >= 0) {
          spinner.info(`Moving file ${name} to ${type}`);

          const pOrganize = organize(spinner, sourceDir, outputDir, name, type);

          moved.push(pOrganize);
          isMoved = true;
          break;
        }
      }

      if (!isMoved) {
        spinner.info(`Moving file ${name} to Miscellaneous`);
        moved.push(
          organize(spinner, sourceDir, outputDir, name, 'Miscellaneous')
        );
      }
    }
  }

  return moved;
};

const moveSpecificFileTypes = (spFormats, spFolder, fileNames, sourceDir, outputDir, spinner) => {
  const names = fileNames.filter((name) => {
    if (!isValidFile(name, sourceDir)) {
      return false;
    }

    const extension = getFileExtension(name);
    return spFormats.indexOf(extension) !== -1;
  });

  const moved = [];

  for (let name of names) {
    spinner.info(`Moving file ${name} to ${spFolder}`);

    const pOrganize = organize(spinner, sourceDir, outputDir, name, spFolder);
    moved.push(pOrganize);
  }

  return moved;
};

module.exports = {
  mkdir,
  getFileExtension,
  organize,
  moveUsingFormatsConfig,
  moveSpecificFileTypes
};
