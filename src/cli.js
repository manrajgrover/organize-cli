#!/usr/bin/env node

'use strict';

const yargs = require('yargs');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const ora = require('ora');

const {
  organizeByDefaults,
  organizeBySpecificFileTypes,
  organizeByDates
} = require('./helpers');

const argv = yargs
  .usage('Usage: $0 [options]')
  .alias('o', 'output')
    .describe('o', "Output directory - Creates one if doesn't exist")
    .string('o')
  .alias('d', 'date')
    .describe('d', 'Organize files by dates')
    .boolean('d')
  .alias('s', 'source')
    .describe('s', 'Source directory to organize')
    .string('s')
  .alias('t', 'type')
    .describe('t', 'Specific types to organize - strings of file extensions')
    .array('t')
  .alias('f', 'folder')
    .describe('f', 'Specific folder to move specific files to')
    .string('f')
  .alias('l', 'list')
    .describe('List the mv commands that will be executed without actually executing them')
    .boolean('l')
  .demand(['s'])
  .example('$0 -s ~/Downloads -o . -t mp3 wav -f "Songs"')
  .help('h')
  .alias('h', 'help')
  .argv;

let spinner = ora('Scanning').start();

const sourceDir = argv.source ? path.resolve(
  process.cwd(), argv.source) : process.cwd();
const outputDir = argv.output ? path.resolve(
  process.cwd(), argv.output) : sourceDir;

let names = fs.readdirSync(sourceDir);
let moved = [];

let listOnly = argv.l;

if (argv.d) {
  moved = organizeByDates(names, sourceDir, outputDir, spinner, listOnly);
} else if (argv.t && argv.f) {
  const spFormats = argv.t;
  const spFolder = argv.f;

  moved = organizeBySpecificFileTypes(spFormats, spFolder, names, sourceDir, outputDir, spinner, listOnly);
} else {
  moved = organizeByDefaults(names, sourceDir, outputDir, spinner, listOnly);
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
