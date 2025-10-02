module.exports = function(grunt) {
	grunt.initConfig({
		compress: {
			main: {
				options: {
					archive: 'sushma-api.zip',
					mode: 'zip'
				},
				files: [
					{
						expand: true,
						src: [
							'**',
							'!node_modules/**',
							'!.git/**',
							'!.claude/**',
							'!*.zip',
							'!Gruntfile.js',
							'!package-lock.json',
							'!composer.lock',
							'!.DS_Store',
							'!build/*.asset.php'
						],
						dest: 'sushma-api/'
					}
				]
			}
		},

		exec: {
			npm_build: {
				cmd: 'npm run build'
			},
			composer_install: {
				cmd: 'composer install --no-dev --optimize-autoloader'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-exec');

	grunt.registerTask('package', ['exec:npm_build', 'exec:composer_install', 'compress']);
	grunt.registerTask('default', ['package']);
};
