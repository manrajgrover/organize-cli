var fs = require('fs'), path = require('path');

var getExtension = function(filename) {
	var i = filename.lastIndexOf('.');
	return (i < 0) ? '' : filename.substr(i);
}

var mkdir = function(path){
    try{
        fs.mkdirSync(path);
    } catch(e){
        if(e.code != 'EEXIST'){
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
    "Music": audio,
    "Codes": code,
    "Compressed": compressed,
    "Documents": docs,
    "Images": images,
    "System Files": sys_files,
    "Video": video
};
var fileNames = fs.readdirSync(__dirname);

for (var i = 0; i < fileNames.length; i++) {
    var fileExtension = getExtension(fileNames[i]).toUpperCase();
	console.log(fileExtension);
}