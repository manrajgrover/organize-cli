#!/usr/bin/env node

'use strict';

const yargs = require('yargs');
const chalk = require('chalk');
const fs = require('fs');
const formats = require('./formats');
const path = require('path');
const ora = require('ora');

const { getFileNames, getFileExtension, organize } = require('./helpers');

const isValidFile = (name, dir) => name.indexOf('.') !== 0 && !fs.statSync(path.join(dir, name)).isDirectory();

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
  console.log(moved);

  for (let name of names) {
    spinner.info(`Moving file ${name} to ${spFolder}`);

    const pOrganize = organize(spinner, sourceDir, outputDir, name, spFolder);
    moved.push(pOrganize);
  }

  return moved;
};

const argv = yargs
  .usage('Usage: $0 [options]')
  .alias('o', 'output')
    .describe('o', "Output directory - Creates one if doesn't exist")
    .string('o')
  .alias('s', 'source')
    .describe('s', 'Source directory to organize')
    .string('s')
  .alias('t', 'type')
    .describe('t', 'Specific types to organize - comma separated string of file extensions')
    .string('t')
  .alias('f', 'folder')
    .describe('f', 'Specific folder to move specific files to')
    .string('f')
  .example('$0 -s ~/Downloads -o . -t "mp3, wav" -f "Songs"')
  .help('h')
  .alias('h', 'help')
  .argv;

if (!argv.source) {
  console.log(chalk.cyan('Please provide a source, do a `organize -h` for help'));
  process.exit(-1);
}

let spinner = ora('Scanning').start();

const sourceDir = argv.source ? path.resolve(
  process.cwd(), argv.source) : process.cwd();
let outputDir = argv.output ? path.resolve(
  process.cwd(), argv.output) : sourceDir;

let names = getFileNames(sourceDir);
let moved = [];

if (argv.t && argv.f) {
  const spFormats = argv.t.split(',').map(ext => ext.trim());
  const spFolder = argv.f;

  moved = moveSpecificFileTypes(spFormats, spFolder, names, sourceDir, outputDir, spinner);
} else {
  moved = moveUsingFormatsConfig(names, sourceDir, outputDir, spinner);
}

Promise.all(moved.map(p => p.catch(e => e)))
  .then((messages) => {
    let isError = false;
    for (let message of messages) {
      if (message instanceof Error) {
        spinner.fail("Couldn't move all files!");
        isError = true;
        break;
      }
    }

    if (!isError) {
      spinner.succeed('Moved all files!');
    }
  })
  .catch(err => spinner.fail('An error occured!'));
