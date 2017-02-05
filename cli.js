#!/usr/bin/env node

const yargs = require('yargs');
const chalk = require('chalk');
const fs = require('fs');
const helpers = require('./helpers');
const formats = require('./formats');
const path = require('path');

const getFileNames = helpers.getFileNames;
const getExtension = helpers.getExtension;
const organize = helpers.organize;

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

    const outputDirectory = argvFiles.output ? path.resolve(
      process.cwd(), argvFiles.output) : process.cwd();
    const sourceDirectory = argvFiles.source ? path.resolve(
      process.cwd(), argvFiles.source) : process.cwd();

    const fileNames = getFileNames(sourceDirectory);
    console.log(chalk.green('Scanning'));

    let moveFiles = [];

    for (let fileName of fileNames) {
      if (fileName.indexOf('.') === 0) {
        continue;
      }
      if (!fs.statSync(path.join(sourceDirectory, fileName)).isDirectory()) {
        const fileExtension = getExtension(fileName).toUpperCase();
        for (let fileType of Object.keys(formats)) {
          if (formats[fileType].indexOf(fileExtension) >= 0) {
            moveFiles.push(
              organize(sourceDirectory, outputDirectory, fileName, fileType)
            );
          } else {
            moveFiles.push(
              organize(sourceDirectory, outputDirectory, fileName, 'Miscellaneous')
            );
          }
        }
      }
    }

    Promise.all(moveFiles).then((messages) => {
      for (let message of messages) {
        console.log(chalk.yellow(message));
      }
      console.log(chalk.green('Done!'));
    }).catch(err => console.log(chalk.yellow(err)));
  })
  .help('h')
  .alias('h', 'help')
  .argv;
