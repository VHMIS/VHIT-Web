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
        "select2",
        "vhmis-modal",
        "url",
        "main",
        "nckh"
    ].map(function(js) {
        return "src/js/" + js + ".js";
    }),

    // Sass
    sass = {
        site: {
            options: {
                sourcemap: 'none',
                style: 'expanded'
            },
            files: {
                'client/css/font_icon.css': 'src/css/font_icon.scss',
                'client/css/main.css': 'src/css/main.scss',
                'client/css/aciids.css': 'src/css/aciids.scss',
                'client/css/cest.css': 'src/css/cest.scss',
                'client/css/10nam.css': 'src/css/10nam.scss'
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
            tasks: ['sass:site', 'postcss']
        },
        maincss: {
            files: ['src/css/*.scss'],
            tasks: ['sass:site', 'postcss']
        },
        js: {
            files: ['src/js/*.js'],
            tasks: ['concat:js']
        }
    },

    // Auto prefixer css
    postcss = {
        options: {
            map: false,
            processors: [
                require('autoprefixer')({browsers: 'last 2 versions'})
            ]
        },
        dist: {
            src: 'client/css/*.css'
        }
    },

    // Min css
    cssnano = {
        options: {
            sourcemap: false
        },
        dist: {
            files: {
                'client/css/font_icon.css': 'client/css/font_icon.css',
                'client/css/main.css' : 'client/css/main.css',
                'client/css/aciids.css' : 'client/css/aciids.css',
                'client/css/cest.css' : 'client/css/cest.css',
                'client/css/10nam.css' : 'client/css/10nam.css'
            }
        }
    };


grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-shell');
grunt.loadNpmTasks('grunt-postcss');
grunt.loadNpmTasks('grunt-cssnano');
grunt.loadNpmTasks('grunt-contrib-watch');

grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: join,
    uglify: minify,
    sass: sass,
    shell: commands,
    postcss: postcss,
    cssnano: cssnano,
    watch: watch
});

// Tasks
grunt.registerTask('clear', ['shell:clear'])
grunt.registerTask('css', ['sass:site'])
grunt.registerTask('js', ['concat:js'])
grunt.registerTask('min', ['cssnano', 'uglify:js'])
grunt.registerTask('production', ['sass:site', 'postcss', 'cssnano', 'concat:js', 'uglify:js'])
grunt.registerTask('default', ['sass:site', 'postcss', 'concat:js'])

};
