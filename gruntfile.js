module.exports = function(grunt) {

var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {

      all: {
        files: ['dev/*.html'],
        options: {

        }
      },

      js: {
        files: ['dev/js/**'],
        tasks: ['jshint'],
        options: {

        }
      },

      html: {
        files: ['*.html'],
        options: {

        }
      },

      sass: {
        files: ['dev/sass/*.scss','dev/sass/*.sass', 'dev/sass/**/*.scss'],
        tasks: ['sass:dev'],
        options: {

        }
      },

      css: {
        files: ['dev/css/*.css'],
        options: {

        }
      },

      livereload: {
        options: { livereload: true },
        files: [
          'dev/*.html',
          'dev/sass/*.scss',
          'dev/sass/*.sass',
          'dev/css/*.css'
        ]
      }

    },

    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, '')
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test')
            ];
          }
        }
      }
    },

    jshint: {
      all: [
        'gruntfile.js',
        'dev/js/terror.js'
      ]
    },

    // concat: {
    //   options: {
    //     separator: ';'
    //   },
    //   dist: {
    //     src:['js/**/*.js'],
    //     dest: 'tmp/<%= pkg.name %>.js'
    //   }
    // },

    // uglify: {
    //   options: {
    //     banner: '/*! <%= pkg.name %> - <%= pkg.author %> - <%= grunt.template.today("dd-mm-yyyy") %>*/\n'
    //   },
    //   dist: {
    //     files: {
    //       'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
    //     }
    //   }
    // },

    // compass: {
    //   options: {
    //     sassDir: 'dev/sass',
    //     cssDir: 'css'
    //   },
    //   dist: {},
    //   server: {
    //     options: {
    //       debugInfo: true
    //     }
    //   }
    // },

    sass: {
      dist: {},
      dev: {
        options: {
          style: 'expanded'
        },
        files: {
          'dev/css/main.css': 'dev/sass/main.scss'
        }
      }
    },

    cssmin: {
      options: {
        banner: '/*! <%= pkg.name %> - <%= pkg.author %> - <%= grunt.template.today("dd-mm-yyyy") %>*/\n',
        report: 'min',
        keepSpecialComments: 1
      },
      dist: {
        files: {
          'dist/css/<%= pkg.name %>.min.css': [
            'dev/css/main.css'
          ]
        }
      }
    },

    imagemin: {
      dist: {
        options: {
          optimizationLevel: 5
        },
        files: [{
          expand: true,
          cwd: 'dev/img',
          src: ['*.{png,jpg,jpeg,gif}'],
          dest: 'dist/img/'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: 'dist/',
          src: '*.html',
          dest: 'dist/'
        }]
      }
    },

    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'dev/',
            dest: 'dist',
            src: [
              '*.html',
              'favicon.ico'
            ]
          },
          {
            expand: true,
            cwd: 'dev/fonts/',
            dest: 'dist/fonts',
            src: [
              '**'
            ]
          }// ,
          // {
          //   expand: true,
          //   cwd: 'dev/img/',
          //   dest: 'dist/img',
          //   src: [
          //     '**'
          //   ]
          //  }//,
          // {
          //   expand: true,
          //   cwd: 'dev/css/',
          //   dest: 'dist/css',
          //   src: [
          //     'home.css'
          //   ]
          // }
        ]
      },
      backup: {
        files: [
          {
            expand: true,
            cwd: 'dist/',
            dest: 'dist/backup',
            src: [
              '*.*'
            ]
          },
          {
            expand: true,
            cwd: 'dist/css',
            dest: 'dist/backup/css',
            src: [
              '*.*'
            ]
          },
          {
            expand: true,
            cwd: 'dist/fonts',
            dest: 'dist/backup/fonts',
            src: [
              '*.*'
            ]
          },
          {
            expand: true,
            cwd: 'dist/img',
            dest: 'dist/backup/img',
            src: [
              '*.*'
            ]
          },
          {
            expand: true,
            cwd: 'dist/js',
            dest: 'dist/backup/js',
            src: [
              '*.*'
            ]
          }
        ]
      }
    },

    useminPrepare: {
      html: {
        src: ['dev/index.html']
      },
      options: {
        dest: 'dist/'
      }
    },
    usemin: {
      html: ['dist/{,*/}*.html'],
      css: ['dist/css/{,*/}*.css'],
      options: {
        dirs: ['dist/']
      }
    },

    clean: {
      tmp: {
        src: ['tmp/', '.tmp/']
      },
      backup: {
        src: ['dist/backup']
      }
    },

    open: {
      dev: {
        path: 'http://localhost:9000/dev/'
      },
      dist: {
        path: 'http://localhost:9000/dist/'
      }
    },

    'ftp-deploy': {
      build: {
        auth: {
          host: '184.168.167.1',
          port: 21,
          authKey: "classless"
        },
        src: 'dist/',
        dest: '/',
        exclusions: ['dist/**/.DS_Store']
      }, 
      test: {
          auth: {
            host: '184.168.167.1',
            port: 21,
            authKey: "classless"
          },
          src: 'dist/',
          dest: 'test/',
          exclusions: ['dist/**/.DS_Store']
      }
    }
    
  });


  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['server']);

  grunt.registerTask('server', [
    'connect:livereload',
    'open:dev',
    'watch'
  ]);

  grunt.registerTask('serve', [
    'connect:livereload',
    'open:dev',
    'watch'
  ]);


  grunt.registerTask('view', [
    'connect:livereload',
    'open:dev',
    'watch:livereload'
  ]);

  grunt.registerTask('build', [
    'clean:backup',
    'copy:backup',
    'jshint',
    'useminPrepare',
    'concat',
    'uglify',
    'sass',
    'cssmin',
    'imagemin',
    'copy:main',
    'clean:tmp',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('live', [
    'connect:livereload',
    'open:dist',
    'watch:livereload'
  ]);

  grunt.registerTask('deploy', [
    'ftp-deploy:build'
  ]);

  grunt.registerTask('shipit', [
    'build',
    'ftp-deploy:build'
  ]);

  grunt.registerTask('deploytest', [
    'ftp-deploy:test'
  ]);


  grunt.registerTask('test', [
    'copy:backup'
  ]);

};
