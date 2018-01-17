'use strict';

const mv = require('mv');
const fs = require('fs');
const path = require('path');
const dateformat = require('dateformat');
const formats = require('./formats');

/**
 * Check if file is valid
 *
 * @param {string} name Name of file
 * @param {string} dir  File directory
 */
const isValidFile = (name, dir) =>
    (name.indexOf('.') !== 0 &&
     !fs.statSync(path.join(dir, name)).isDirectory());

/**
 * Create a directory if it does not exist
 *
 * @param {string} folderPath Path of folder to be created
 */
const mkdir = (folderPath) => {
  try {
    fs.mkdirSync(folderPath);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw new Error('Error occurred while creating a new directory');
    }
  }
};

/**
 * Get extension of a file
 *
 * @param {string} fileName File name
 */
const getFileExtension = (fileName) => {
  const i = fileName.lastIndexOf('.');
  return (i < 0) ? '' : fileName.substr(i + 1);
};

/**
 * Returns a promise for movement of file to specific directory;
 * Also creates the output directory if not existing
 *
 * @param {Object}  spinner  Ora spinner instance
 * @param {string}  source   Source directory name
 * @param {string}  output   Output directory name
 * @param {string}  fileName File name
 * @param {string}  type     File type
 * @param {boolean} listOnly Only list the commands which will be executed for movement
 */
const organize = (spinner, source, output, fileName, type, listOnly) => {
  const typeDir = path.resolve(output, type);

  // Create the directory only if listOnly is not set
  if (!listOnly) {
    mkdir(output);
    mkdir(typeDir);
  }

  // Return promise for moving a specific file to specific directory
  return new Promise((resolve, reject) => {
    // If listOnly is set, output the command that will be executed without
    // moving the file
    if (listOnly) {
      const listMessage = `mv ${path.resolve(source, fileName)} ${path.resolve(typeDir, fileName)}`;
      spinner.info(listMessage);
      resolve(listMessage);
    } else {
      // Move the file
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
    }
  });
};

/**
 * Organizes files using pre-configured formats and file extensions
 *
 * @param {Array}   files     File names
 * @param {string}  sourceDir Source directory name
 * @param {string}  outputDir Output directory name
 * @param {Object}  spinner   Ora spinner instance
 * @param {boolean} listOnly  Only list the commands which will be executed for movement
 */
const organizeByDefaults = (files, sourceDir, outputDir, spinner, listOnly) => {
  const moved = [];

  for (let file of files) {
    // Check if file is valid
    if (isValidFile(file, sourceDir)) {
      // Get file extension
      const extension = getFileExtension(file).toUpperCase();
      let isMoved = false;

      // Iterating over format types
      for (let type of Object.keys(formats)) {
        if (formats[type].indexOf(extension) >= 0) {
          // Output to spinner that this file will be moved
          spinner.info(`Moving file ${file} to ${type}`);

          // Move the file to format directory
          const pOrganize = organize(spinner, sourceDir, outputDir, file, type, listOnly);

          // Push the promise to array
          moved.push(pOrganize);
          isMoved = true;
          break;
        }
      }

      // If file extension does not exist in config,
      // move the file to Miscellaneous folder
      if (!isMoved) {
        // Output to spinner that this file will be moved
        spinner.info(`Moving file ${file} to Miscellaneous`);

        // Push the promise to array
        moved.push(
          organize(spinner, sourceDir, outputDir, file, 'Miscellaneous', listOnly)
        );
      }
    }
  }

  return moved;
};

/**
 * Organize specific file types
 *
 * @param {Array}   spFormats Organize only specific formats
 * @param {string}  spFolder  Move specific files to this folder name
 * @param {Array}   files     File names
 * @param {string}  sourceDir Source directory name
 * @param {string}  outputDir Output directory name
 * @param {Object}  spinner   Ora spinner instance
 * @param {boolean} listOnly  Only list the commands which will be executed for movement
 */
const organizeBySpecificFileTypes = (
    spFormats, spFolder, files, sourceDir, outputDir, spinner, listOnly) => {
  // Filter file names on specific formats
  const names = files.filter((name) => {
    if (!isValidFile(name, sourceDir)) {
      return false;
    }

    const extension = getFileExtension(name);
    return spFormats.indexOf(extension) !== -1;
  });

  const moved = [];

  for (let name of names) {
    // Output to spinner that this file will be moved
    spinner.info(`Moving file ${name} to ${spFolder}`);

    // Move the file to output directory
    const pOrganize = organize(spinner, sourceDir, outputDir, name, spFolder, listOnly);

    // Push the promise to array
    moved.push(pOrganize);
  }

  return moved;
};

/**
 * Organizes the files by creation date
 *
 * @param {Array}   files     Files to be organized
 * @param {string}  sourceDir Source directory name
 * @param {string}  outputDir Output directory name
 * @param {object}  spinner   Ora spinner instance
 * @param {boolean} listOnly  Only list the commands which will be executed for movement
 */
const organizeByDates = (files, sourceDir, outputDir, spinner, listOnly) => {
  const moved = [];

  for (let file of files) {
    // Get date when the file was created
    let date = fs.statSync(path.join(sourceDir, file));
    date = dateformat(new Date(date.mtime), 'yyyy-mm-dd');

    // Output to spinner that this file will be moved
    spinner.info(`Moving file ${file} to ${date} folder`);

    // Move the file to output directory
    const pOrganize = organize(spinner, sourceDir, outputDir, file, date, listOnly);

    // Push the promise to array
    moved.push(pOrganize);
  }

  return moved;
};

module.exports = {
  mkdir,
  getFileExtension,
  organize,
  organizeByDefaults,
  organizeBySpecificFileTypes,
  organizeByDates
};
