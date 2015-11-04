var grunt = require('grunt');

module.exports = function() {
  grunt.initConfig({
    textlint: {
      src: ["./*.md"]
    }
  });
  grunt.loadNpmTasks('grunt-textlint');
};
