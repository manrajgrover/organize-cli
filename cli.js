#!/usr/bin/env node

'use strict';

const yargs = require('yargs');
const fs = require('fs');
const ora = require('ora');
const chalk = require('chalk');
const path = require('path');
const mv = require('mv');

const getExtension = (fileName) => {
	let i = fileName.lastIndexOf('.');
	return (i < 0) ? '' : fileName.substr(i + 1);
}

const mkdir = (path) => {
	try {
		fs.mkdirSync(path);
	} catch (err) {
		if (err.code != 'EEXIST') {
			throw new Error("Error occurred while creating a new directory");
		}
	}
}

const organizeiT = (directory, fileName, type) => {
  let dir = path.resolve(directory, 'Organize_' + type);
	mkdir(dir);
	mv(path.resolve(process.cwd(), fileName), path.resolve(dir, fileName), function (err) {
		if (err) {
			throw new Error("Couldn't move " + fileName + " because of following error: " + err);
		}
	});
}

const audio = ["MP3", "WAV", "WMA", "MKA", "AAC", "MID", "RA", "RAM", "RM", "OGG"];
const code = ["CPP", "RB", "PY", "HTML", "CSS", "JS"];
const compressed = ["RAR", "JAR", "ZIP", "TAR", "MAR", "ISO", "LZ", "7ZIP", "TGZ", "GZ", "BZ2"];
const docs = ["DOC", "DOCX", "PPT", "PPTX", "PAGES", "PDF", "ODT", "ODP", "XLSX", "XLS", "ODS", "TXT", "IN", "OUT", "MD"];
const images = ["JPG", "JPEG", "GIF", "PNG", "SVG"];
const sys_files = ["DEB", "EXE", "SH", "BUNDLE"];
const video = ["FLV", "WMV", "MOV", "MP4", "MPEG", "3GP", "MKV"];

const formats = {
	"Music" : audio,
	"Codes" : code,
	"Compressed" : compressed,
	"Documents" : docs,
	"Images" : images,
	"System Files" : sys_files,
	"Video" : video
};

const argv = yargs
  .usage('organize <command>')
  .command('it', 'Organizes current directory', (yargs) => {
    let fileNames = fs.readdirSync(process.cwd());
    console.log(chalk.green('Scanning'));
    for (let i = 0; i < fileNames.length; i++) {
      let fileExtension = getExtension(fileNames[i]).toUpperCase();
      for (let type in formats) {
        if (formats.hasOwnProperty(type) && formats[type].indexOf(fileExtension) >= 0) {
          organizeiT(process.cwd(), fileNames[i], type);
        }
      }
    }
    console.log(chalk.green('Done!'));
  })
  .help('h')
  .alias('h', 'help')
  .argv;
