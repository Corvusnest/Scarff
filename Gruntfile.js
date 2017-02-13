module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            files: ['app.js', 'settings.js', 'messages.js',
            'routes/*.js', 'model/*.js'],
                options: {
                esversion: 6,
                globals: {
                    jQuery: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['jshint']);

};
