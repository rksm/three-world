module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // -=-=-=-=-
    // js tests
    // -=-=-=-=-
    jshint: {
      files: ['Gruntfile.js', 'world.js', 'lib/**/*.js', 'tests/**/*.js'],
      options: {
        laxbreak: true,
        globals: {console: true, module: true, document: true}
      }
    },

    // -=-=-=-=-=-=-=-
    // build bundles
    // -=-=-=-=-=-=-=-
    concat: {
      options: {sourceMap: true, sourceMapStyle: 'link', separator: ';\n'},
      "three-world.dev.js": {
        src: ["world.js"],
        dest: "three-world.dev.js"
      }
    },

    uglify: {
      "three-world.min.js": {
        options: {
          sourceMap: true,
          banner: '/*! <%= pkg.name %>-v<%= pkg.version %> '
                + '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: {"three-world.min.js": "three-world.dev.js"}
      }
    }

  });

  grunt.registerTask('build', ['concat:three-world.dev.js', 'uglify:three-world.min.js']);
  
};
