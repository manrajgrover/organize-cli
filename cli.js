#!/usr/bin/env node

'use strict';

const yargs = require('yargs');
const chalk = require('chalk');
const Helpers = require('./helpers');
const formats = require('./formats');

const helperInstance = new Helpers();

const argv = yargs
  .usage('organize <command>')
  .command('it', 'Organizes current directory', (yargs) => {

    let fileNames = helperInstance.getFileNames(process.cwd());

    console.log(chalk.green('Scanning'));

    for (let i = 0; i < fileNames.length; i++) {

      let fileExtension = helperInstance.getExtension(fileNames[i]).toUpperCase();

      for (let type in formats) {

        if (formats.hasOwnProperty(type) && formats[type].indexOf(fileExtension) >= 0) {

          helperInstance.organize(process.cwd(), fileNames[i], type);

        }
      }
    }

    console.log(chalk.green('Done!'));
  })
  .help('h')
  .alias('h', 'help')
  .argv;
