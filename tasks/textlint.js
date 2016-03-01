var vfs = require('vinyl-fs');
var through = require('through2');
var Engine = require('textlint').TextLintEngine;

module.exports = function(grunt) {
  grunt.registerTask('textlint', function() {

    function textlint(options) {
      var engine = new Engine(options);
      var filePaths = [];
      
      return through.obj(function(file, enc, cb) {
        filePaths.push(file.path);
        this.push(file);
        cb();
      }, function(cb) {
        var _this = this;
        
        try {
          engine.executeOnFiles(filePaths).then(function(results) {
            
            grunt.log.writeln('[textlint] These files were linted');
            results.forEach(function(result) {
              grunt.log.writeln('  ' + result.filePath);
            });
            
            if (engine.isErrorResults(results)) {
              grunt.log.writeln(engine.formatResults(results));
            }
            else{
              grunt.log.writeln('[textlint] No error');
            }
            
            _this.emit('end');
            cb();  
          });
        }
        catch(e) {
          grunt.fail.warn("Failed execute grunt-textlint");
          cb();
        }
      });
    }

    var config = grunt.config('textlint');
    var options = config.options || {};

    vfs.src(config.src)
      .pipe(textlint(options))
      .on('end', this.async());
  });
};
