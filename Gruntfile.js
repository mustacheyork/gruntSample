module.exports = function(grunt) {

    // config
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        compass: {
            dist: {
                options: {
                    config: 'config.rb'
                }
            }
        },

        sass: {
            files: 'sass/*.scss',
            tasks: ['compass']
        }, 

        csslint: {
            check: {
                 src: 'css/style.css'
            }
        }, 

        cssmin: {
            minimize: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */'
                },
                files: {
                    'css/style.min.css': ['css/ie.css', 'css/print.css', 'css/screen.css', 'css/style.css']
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },
            files: ['sass/*.scss', '*.html', 'js/*.js'],
            tasks: ['cssmin', 'compass', 'csslint']
        }, 

        connect: {
            server: {
                options: {
                    port: 8080,
                    hostname: 'localhost'
                }
            }
        },
        open: {
          server: {
            path: 'http://<%= connect.server.options.hostname %>:<%= connect.server.options.port %>'
          }
        }

    });

    // plugin
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');

    // tasks
    grunt.registerTask('default', [ 'cssmin', 'connect', 'open', 'watch', 'compass', 'csslint']);

};
