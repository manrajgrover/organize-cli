'use strict';

var Music = ['MP3', 'WAV', 'WMA', 'MKA', 'AAC', 'MID', 'RA', 'RAM', 'RM', 'OGG'];
var Codes = ['CPP', 'RB', 'PY', 'HTML', 'CSS', 'JS', 'PHP'];
var Compressed = ['RAR', 'JAR', 'ZIP', 'TAR', 'MAR', 'ISO', 'LZ', '7ZIP', 'TGZ', 'GZ', 'BZ2'];
var Documents = ['DOC', 'DOCX', 'PPT', 'PPTX', 'PAGES', 'PDF', 'ODT', 'ODP', 'XLSX', 'XLS', 'ODS', 'TXT', 'IN', 'OUT', 'MD'];
var Images = ['JPG', 'JPEG', 'GIF', 'PNG', 'SVG'];
var Executables = ['DEB', 'EXE', 'SH', 'BUNDLE'];
var Video = ['FLV', 'WMV', 'MOV', 'MP4', 'MPEG', '3GP', 'MKV'];

module.exports = {
  Music: Music,
  Codes: Codes,
  Compressed: Compressed,
  Documents: Documents,
  Images: Images,
  Video: Video,
  Executables: Executables
};