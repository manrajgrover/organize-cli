#!/usr/bin/env node

'use strict';

const yargs = require('yargs');
const chalk = require('chalk');
const helpers = require('./helpers');
const formats = require('./formats');

const getExtension = helpers.getExtension,
      getFileNames = helpers.getFileNames,
      organize = helpers.organize;

const argv = yargs
  .usage('organize <command>')
  .command('it', 'Organizes current directory', (yargs) => {
    let fileNames = getFileNames(process.cwd());
    console.log(chalk.green('Scanning'));
    for (let i = 0; i < fileNames.length; i++) {
      let fileExtension = getExtension(fileNames[i]).toUpperCase();
      for (let type in formats) {
        if (formats.hasOwnProperty(type) && formats[type].indexOf(fileExtension) >= 0) {
          organize(process.cwd(), fileNames[i], type);
        }
      }
    }
    console.log(chalk.green('Done!'));
  })
  .help('h')
  .alias('h', 'help')
  .argv;
