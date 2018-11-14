const path = require('path');
module.exports =  {
  getPath(_path) {
    return path.join(__dirname, '../' ,_path);
  }
}