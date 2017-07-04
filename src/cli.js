#!/usr/bin/env node

'use strict';

const yargs = require('yargs');
const chalk = require('chalk');
const fs = require('fs');
const formats = require('./formats');
const path = require('path');
const ora = require('ora');

const { getFileNames, getExtension, organize } = require('./helpers');

const argv = yargs
  .usage('organize <command>')
  .command('files', 'Organizes current directory', (yargsFiles) => {
    const argvFiles = yargsFiles
      .usage('Usage: $0 files [options]')
      .alias('o', 'output')
        .describe('o', 'Output directory - Creates one if doesn\'t exist ')
        .string('o')
      .alias('s', 'source')
        .describe('s', 'Source directory to organize')
        .string('s')
      .example('$0 files -s ~/Downloads -o .')
      .argv;

    let spinner = ora('Scanning').start();

    const sourceDirectory = argvFiles.source ? path.resolve(
      process.cwd(), argvFiles.source) : process.cwd();
    const outputDirectory = argvFiles.output ? path.resolve(
      process.cwd(), argvFiles.output) : sourceDirectory;

    const fileNames = getFileNames(sourceDirectory);

    const movedFiles = [];

    for (let fileName of fileNames) {
      if (fileName.indexOf('.') !== 0 && !fs.statSync(path.join(sourceDirectory, fileName)).isDirectory()) {
        const fileExtension = getExtension(fileName).toUpperCase();
        let isMoved = false;

        for (let fileType of Object.keys(formats)) {
          if (formats[fileType].indexOf(fileExtension) >= 0) {
            spinner.info(`Moving file ${fileName} to ${fileType}`);
            movedFiles.push(
              organize(spinner, sourceDirectory, outputDirectory, fileName, fileType)
            );
            isMoved = true;
            break;
          }
        }

        if (!isMoved) {
          spinner.info(`Moving file ${fileName} to Miscellaneous`);
          movedFiles.push(
            organize(spinner, sourceDirectory, outputDirectory, fileName, 'Miscellaneous')
          );
        }
      }
    }

    Promise.all(movedFiles.map(p => p.catch(e => e)))
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
  })
  .help('h')
  .alias('h', 'help')
  .argv;
