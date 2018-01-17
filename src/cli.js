#!/usr/bin/env node

'use strict';

const yargs = require('yargs');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const ora = require('ora');

/**
 * Get helper functions from `helpers`
 */
const {
  organizeByDefaults,
  organizeBySpecificFileTypes,
  organizeByDates
} = require('./helpers');


/**
 * Pass all arguments passed using `yargs`
 */
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
    .describe('l', 'List the mv commands that will be executed without actually executing them')
    .boolean('l')
  .demand(['s'])
  .example('$0 -s ~/Downloads -o . -t mp3 wav -f "Songs"')
  .help('h')
  .alias('h', 'help')
  .argv;

/**
 * Spinner initialization
 */
let spinner = ora('Scanning').start();

/**
 * Get source directory, if provided in arguments
 * Defaults to current working directory
 */
const sourceDir = argv.source ? path.resolve(
  process.cwd(), argv.source) : process.cwd();
/**
 * Get output directory, if provided in arguments
 * Defaults to source directory
 */
const outputDir = argv.output ? path.resolve(
  process.cwd(), argv.output) : sourceDir;

let names = fs.readdirSync(sourceDir);
let moved = [];

let listOnly = argv.l;

// If date flag is passed, organize by dates
if (argv.d) {
  moved = organizeByDates(names, sourceDir, outputDir, spinner, listOnly);
} else if (argv.t && argv.f) {
  // Organize specific file formats and move to specific folder
  const spFormats = argv.t;
  const spFolder = argv.f;

  moved = organizeBySpecificFileTypes(
    spFormats, spFolder, names, sourceDir, outputDir, spinner, listOnly
  );
} else {
  // Defaults to normal behavior
  moved = organizeByDefaults(names, sourceDir, outputDir, spinner, listOnly);
}

/**
 * Resolves all promises and catches any error
 * while moving a file
 */
Promise.all(moved.map(p => p.catch(e => e)))
  .then((messages) => {
    let isError = false;

    // Check if any promise failed
    for (let message of messages) {
      if (message instanceof Error) {
        spinner.fail("Couldn't move all files!");
        isError = true;
        break;
      }
    }

    if (!listOnly && !isError) {
      spinner.succeed('Moved all files!');
    }
  })
  .catch(err => spinner.fail('An error occured!'));
