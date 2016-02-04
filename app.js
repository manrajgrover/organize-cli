#! /usr/bin/env node

var fs = require('fs'), mv = require('mv');

var getExtension = function (fileName) {
	var i = fileName.lastIndexOf('.');
	return (i < 0) ? '' : fileName.substr(i + 1);
}

var mkdir = function (path) {
	try {
		fs.mkdirSync(path);
	} catch (err) {
		if (err.code != 'EEXIST') {
			throw new Error("Error occurred while creating a new directory");
		}
	}
}

var organizeiT = function (fileName, type) {
	var path = process.cwd() + '/Organized_' + type;
	mkdir(path);
	mv(process.cwd() + '/' + fileName, path + '/' + fileName, function (err) {
		if (err) {
			throw new Error("Couldn't move " + fileName + " because of following error: " + err);
		}
	});
}

var audio = ["MP3", "WAV", "WMA", "MKA", "AAC", "MID", "RA", "RAM", "RM", "OGG"];
var code = ["CPP", "RB", "PY", "HTML", "CSS", "JS"];
var compressed = ["RAR", "JAR", "ZIP", "TAR", "MAR", "ISO", "LZ", "7ZIP", "TGZ", "GZ", "BZ2"];
var docs = ["DOC", "DOCX", "PPT", "PPTX", "PAGES", "PDF", "ODT", "ODP", "XLSX", "XLS", "ODS", "TXT", "IN", "OUT", "MD"];
var images = ["JPG", "JPEG", "GIF", "PNG", "SVG"];
var sys_files = ["DEB", "EXE", "SH", "BUNDLE"];
var video = ["FLV", "WMV", "MOV", "MP4", "MPEG", "3GP", "MKV"];

var formats = {
	"Music" : audio,
	"Codes" : code,
	"Compressed" : compressed,
	"Documents" : docs,
	"Images" : images,
	"System Files" : sys_files,
	"Video" : video
};

console.log('Scanning files..');

var fileNames = fs.readdirSync(process.cwd());

try {
	for (var i = 0; i < fileNames.length; i++) {
		var fileExtension = getExtension(fileNames[i]).toUpperCase();
		for (var type in formats) {
			if (formats.hasOwnProperty(type) && formats[type].indexOf(fileExtension) >= 0) {
				organizeiT(fileNames[i], type);
			}
		}
	}
} catch (err) {
	console.log(err);
	process.exit();
}

console.log('Done!');