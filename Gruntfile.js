module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js', 'index.js', 'lib/*.js', 'test/*.js']
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', ['jshint']);

  grunt.loadNpmTasks('grunt-coveralls');
  grunt.registerTask('coverage', ['coveralls']);
};
