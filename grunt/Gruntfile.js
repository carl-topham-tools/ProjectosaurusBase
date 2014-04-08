module.exports = function(grunt) {
    //Variables

    //REQUIRES SASS 3.3 rc 2 (for the BEM goodness!)

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        //watch


        watch: {
          css: {
            files: '../src/scss/**/*.scss',
            tasks: ['sass:dev', 'autoprefixer', 'notify:done' ],
            options: {
              livereload: true,
            },
          },

        },


        // end watch

        //sass



        sass: {                              // Task
            dev: {                            // Target
              options: {                       // Target options
                style: 'expanded',
                sourcemap: true,
              },
              files: {                         // Dictionary of files
                '../static/css/style.css': '../src/scss/style.scss',
              }
            },
            dist: {                            // Target
              options: {                       // Target options
                style: 'expanded',
              },
              files: {                         // Dictionary of files
                '../static/css/style.css': '../src/scss/style.scss',
              }
            }
          },



        // end sass



        //auto prefixer


        autoprefixer: {

            options: {
              browsers: ['last 8 version', 'ie 8', 'ie 7']
            },

            // just prefix the specified file
            single_file: {
              options: {
                // Target-specific options go here.
              },
              src: '../static/css/style.css',
              dest: '../static/css/style.css'
            }
          },


       //end auto prefixer


      //css min

      cssmin: {
        minify: {
          expand: true,
          cwd: '../static/css',
          src: ['*.css', '!*.min.css'],
          dest: '../dist/static/css',
          ext: '.css',
          report: 'gzip'
        }
      },

      // end ccs min




      //check using csscss - need right version of ruby!
      csscss: {
          options: {
            minMatch: 4,
            verbose: true,
            shorthand: false,
          },
          dist: {
            src: ['../static/css/style.css']
          }
        },







    //Dist production
    copy: {
      dist: {
        files: [ {src: '../index.html', dest: '../dist/index.html'} ]
      }
    },

    'useminPrepare': {
      options: {
        dest: '../dist'
      },
      html: '../index.html'
    },

    usemin: {
      html: ['../dist/index.html']
    },
    // end Dist production  

   







    //notify
    notify: {
      done: {
        options: {
          title: 'Done!',  // optional
          message: 'Whatever you were doing is done!', //required
        }
      },
    }


    });//end grunt package configs

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-csscss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-notify');

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-usemin');

    grunt.registerTask('dist', ['useminPrepare', 'copy', 'concat', 'uglify', 'usemin', 'sass:dist', 'autoprefixer', 'cssmin', 'notify:done']);


    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', []);
    
};
