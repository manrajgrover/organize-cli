var fs = require('fs'), mv = require('mv');

var getExtension = function (filename) {
	var i = filename.lastIndexOf('.');
	return (i < 0) ? '' : filename.substr(i + 1);
}

var mkdir = function (path) {
	try {
		fs.mkdirSync(path);
	} catch (e) {
		if (e.code != 'EEXIST') {
			throw e;
		}
	}
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
var fileNames = fs.readdirSync(__dirname);

for (var i = 0; i < fileNames.length; i++) {
	var fileExtension = getExtension(fileNames[i]).toUpperCase();
	for (var type in formats) {
		if (formats.hasOwnProperty(type) && formats[type].indexOf(fileExtension) >= 0) {
			var path = __dirname + '/Organized_' + type;
			mkdir(path);
			mv(__dirname + '/' + fileNames[i], path + '/' + fileNames[i], function (err) {
				if (err) {
					console.log("Couldn't move " + fileNames[i] + " because of following error: " + err);
				}
			});
		}
	}
	console.log(fileExtension);
}
