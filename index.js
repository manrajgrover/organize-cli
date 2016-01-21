var fs = require('fs');


function getExtension(filename) {
    var i = filename.lastIndexOf('.');
    return (i < 0) ? '' : filename.substr(i);
}

var docs = ["DOC", "DOCX", "PPT", "PPTX", "PAGES", "PDF", "ODT", "ODP", "XLSX", "XLS", "ODS", "TXT", "IN", "OUT"];
var compressed = ["RAR", "JAR", "ZIP", "TAR", "MAR", "ISO", "LZ", "7ZIP", "TGZ", "GZ", "BZ2"];
var audio = ["MP3", "WAV", "WMA", "MKA", "AAC", "MID", "RA", "RAM", "RM", "OGG"];
var video = ["FLV", "WMV", "MOV", "MP4", "MPEG", "3GP", "MKV"];
var code = ["CPP", "RB", "PY", "HTML", "CSS", "JS"];
var images = ["JPG", "JPEG", "GIF", "PNG", "SVG"];
var sys_files = ["DEB", "EXE", "SH", "BUNDLE"];
console.log(__dirname);
var fileNames = fs.readdirSync(__dirname);

for(var i = 0;i< fileNames.length;i++){
    console.log(getExtension(fileNames[i]));
}