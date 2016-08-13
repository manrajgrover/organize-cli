/*
* @Author: Manraj Singh
* @Date:   2016-08-13 20:55:37
* @Last Modified by:   Manraj Singh
* @Last Modified time: 2016-08-13 20:57:52
*/

'use strict';

const audio = ["MP3", "WAV", "WMA", "MKA", "AAC", "MID", "RA", "RAM", "RM", "OGG"];
const code = ["CPP", "RB", "PY", "HTML", "CSS", "JS"];
const compressed = ["RAR", "JAR", "ZIP", "TAR", "MAR", "ISO", "LZ", "7ZIP", "TGZ", "GZ", "BZ2"];
const docs = ["DOC", "DOCX", "PPT", "PPTX", "PAGES", "PDF", "ODT", "ODP", "XLSX", "XLS", "ODS", "TXT", "IN", "OUT", "MD"];
const images = ["JPG", "JPEG", "GIF", "PNG", "SVG"];
const sys_files = ["DEB", "EXE", "SH", "BUNDLE"];
const video = ["FLV", "WMV", "MOV", "MP4", "MPEG", "3GP", "MKV"];

module.exports = {
  "Music" : audio,
  "Codes" : code,
  "Compressed" : compressed,
  "Documents" : docs,
  "Images" : images,
  "System Files" : sys_files,
  "Video" : video
};
