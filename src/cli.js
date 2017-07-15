#!/usr/bin/env node

'use strict';

const yargs = require('yargs');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const ora = require('ora');

const {
  moveUsingFormatsConfig,
  moveSpecificFileTypes
} = require('./helpers');

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
  .demand(['s'])
  .example('$0 -s ~/Downloads -o . -t "mp3, wav" -f "Songs"')
  .help('h')
  .alias('h', 'help')
  .argv;

let spinner = ora('Scanning').start();

const sourceDir = argv.source ? path.resolve(
  process.cwd(), argv.source) : process.cwd();
let outputDir = argv.output ? path.resolve(
  process.cwd(), argv.output) : sourceDir;

let names = fs.readdirSync(sourceDir);
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
