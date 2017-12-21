var fs = require('fs');

exports.logfile = function(path, log, err) {
  if (!path) path = './statics/';
  if (path[path.length - 1] != '/') path += '/';
  if (!log) log = 'nohup.out';
  if (!err) err = 'error.log';

  return {
    init: function (data) {
      if (!data) data = '';
      fs.writeFile(path + log, data, function(){});
      fs.writeFile(path + err, data, function(){});
    },
    write: function (data) {
      fs.appendFile(path + log,'\n' + data.toString(), function(e) {
        if (e) { console.error(e); }
      });
    },
    error: function (data) {
      fs.appendFile(path + err,'\n' + data.toString(), function (e) {
        if (e) { console.error(e); }
      });
    },
    isLogfileEmpty: function () {
      return true;
    },
    isErrorFileEmpty: function () {
      return true;
    }
  }
}