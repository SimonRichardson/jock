module.exports = function(grunt) {
	var src = {
		main: [ 'src/main/javascript/jock/Jock.js', 
				'src/main/javascript/jock/errors/*.js',
				'src/main/javascript/jock/utils/*.js',
				'src/main/javascript/jock/product/*.js',
				'src/main/javascript/jock/option/*.js',
				'src/main/javascript/jock/ioc/errors/*.js',
				'src/main/javascript/jock/ioc/*.js',
				'src/main/javascript/jock/aop/errors/*.js',
				'src/main/javascript/jock/aop/*.js']
	};
	
	grunt.initConfig({
		lint: {
			dest: ['bin/jock.concat.0.0.1.js']
		},
		
		concat: {
			dist: {
				src: src.main.slice(),
				dest: 'bin/jock.concat.0.0.1.js',
				separator: '\n'
			}
		},
		
		min: {
			dist: {
				src: ['bin/jock.concat.0.0.1.js'],
				dest: 'bin/jock.min.0.0.1.js'
			}
		}
	});

	grunt.registerTask('default', 'concat lint:dest min');
};
