var vfs = require('vinyl-fs');
var through = require('through2');
var TextLintEngine = require('textlint').TextLintEngine;

module.exports = function(grunt) {
  grunt.registerTask('textlint', function() {

    function lint(options) {
      var textlint = new TextLintEngine(options);
      var filePaths = [];

      return through.obj(function(file, enc, cb) {
        filePaths.push(file.path);
        this.push(file);
        cb();
      }, function(cb) {
        var results;
        try {
          results = textlint.executeOnFiles(filePaths);
          if (textlint.isErrorResults(results)) {
            grunt.log.writeln(textlint.formatResults(results));
          }
        }
        catch(e) {
          this.emit('error', grunt.log.warn("error"));
          cb();
        }
        this.emit("end");
        cb();
      });
    }

    var config = grunt.config('textlint');
    var options = config.options || {};

    vfs.src(config.src)
      .pipe(lint(options))
      .on('end', this.async());
  });
};

