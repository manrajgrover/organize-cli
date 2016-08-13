/*
* @Author: Manraj Singh
* @Date:   2016-08-13 20:28:25
* @Last Modified by:   Manraj Singh
* @Last Modified time: 2016-08-13 20:33:08
*/

'use strict';

module.exports.getExtension = (fileName) => {
  let i = fileName.lastIndexOf('.');
  return (i < 0) ? '' : fileName.substr(i + 1);
}

module.exports.mkdir = (path) => {
  try {
    fs.mkdirSync(path);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw new Error("Error occurred while creating a new directory");
    }
  }
}

module.exports.organizeiT = (directory, fileName, type) => {
  let dir = path.resolve(directory, 'Organize_' + type);
  mkdir(dir);
  mv(path.resolve(process.cwd(), fileName), path.resolve(dir, fileName), function (err) {
    if (err) {
      throw new Error("Couldn't move " + fileName + " because of following error: " + err);
    }
  });
}
