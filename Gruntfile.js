module.exports = function(grunt) {

"use strict";

var
    // commands
    commands = {
        clear: {
            command: [
                'rm -rf dist/*',
                'rm -rf client/css/*.css',
                'rm -rf client/js/*.js'
            ].join('&&')
        }
    },

    // js files
    jsFiles = [
        "jquery",
        "main"
    ].map(function(js) {
        return "src/js/" + js + ".js";
    }),

    // Sass
    sass = {
        deloy: {
            options: {
                sourcemap: 'none',
                style: 'compressed'
            },
            files: {
                'client/css/main.css': 'src/css/main.scss',
                'client/css/aciids.css': 'src/css/aciids.scss'
            }
        },
        site: {
            options: {
                sourcemap: 'none',
                style: 'expanded'
            },
            files: {
                'client/css/main.css': 'src/css/main.scss',
                'client/css/aciids.css': 'src/css/aciids.scss'
            }
        }

    },

    // Minified js files
    minify = {
        options: {
            preserveComments: false
        },
        js: {
            options: {},
            files: {
                "client/js/main.js": "client/js/main.js"
            }
        }
    },

    // Join files
    join = {
        js: {
            options: {},
            files: {
                'client/js/main.js' : jsFiles
            }
        }
    },

    // Watch files
    watch = {
        css: {
            files: ['src/css/**/*.scss'],
            tasks: ['sass:site']
        },
        maincss: {
            files: ['src/css/*.scss'],
            tasks: ['sass:site']
        },
        js: {
            files: ['src/js/*.js'],
            tasks: ['concat:js']
        }
    };

grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-shell');
grunt.loadNpmTasks('grunt-contrib-watch');

grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: join,
    uglify: minify,
    sass: sass,
    shell: commands,
    watch: watch
});

// Tasks
grunt.registerTask('clear', ['shell:clear'])
grunt.registerTask('css', ['sass:site'])
grunt.registerTask('js', ['concat:js'])
grunt.registerTask('production', ['sass:deloy', 'concat:js', 'uglify:js']);
grunt.registerTask('default', ['sass:site', 'concat:js']);

};
