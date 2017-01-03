#!/usr/bin/env node

'use strict';

const yargs = require('yargs');
const chalk = require('chalk');
const Helper = require('./Helper');
const formats = require('./formats');

const helperInstance = new Helper();

const argv = yargs
  .usage('organize <command>')
  .command('files', 'Organizes current directory', (yargs) => {

    let fileNames = helperInstance.getFileNames(process.cwd());
    console.log(chalk.green('Scanning'));

    fileNames.forEach((fileName) => {
      let fileExtension = helperInstance.getExtension(fileName).toUpperCase();

      for (let type in formats) {
        if (formats.hasOwnProperty(type) && formats[type].indexOf(fileExtension) >= 0) {
          helperInstance.organize(process.cwd(), fileName, type);
        }
      }
    });

    console.log(chalk.green('Done!'));
  })
  .help('h')
  .alias('h', 'help')
  .argv;
