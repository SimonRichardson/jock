module.exports = function(grunt) {
	var src = {
        version: "0.0.1",
		main : [
                'src/main/javascript/jock/Jock.js',
				'src/main/javascript/jock/errors/*.js',
				'src/main/javascript/jock/utils/*.js',
				'src/main/javascript/jock/product/*.js',
				'src/main/javascript/jock/option/Option.js',
                'src/main/javascript/jock/option/none.js',
                'src/main/javascript/jock/option/some.js',
                'src/main/javascript/jock/option/when.js',
				'src/main/javascript/jock/ioc/errors/*.js',
                'src/main/javascript/jock/aop/Aspect.js',
                'src/main/javascript/jock/aop/errors/AspectError.js',
                'src/main/javascript/jock/ioc/Scope.js',
                'src/main/javascript/jock/ioc/Binding.js',
                'src/main/javascript/jock/ioc/Module.js',
                'src/main/javascript/jock/ioc/Injector.js',
                'src/main/javascript/jock/ioc/Provider.js',
                'src/main/javascript/jock/ioc/AbstractModule.js',
                'src/main/javascript/jock/ioc/InjectionPoint.js',
                'src/main/javascript/jock/ioc/errors/BindingError.js',
                'src/main/javascript/jock/ioc/inject.js',
                'src/main/javascript/jock/ioc/injectIn.js',
                'src/main/javascript/jock/tuple/*.js']
	};
	
	grunt.initConfig({

        concat: {
            dist: {
                src: src.main.slice(),
                dest: 'bin/jock.concat.' + src.version + '.js',
                separator: '\n\r\n\r'
            }
        },

		lint: {
			dest: ['bin/jock.concat.' + src.version + '.js']
		},

        jasmine: {
            all: {
                src:['src/test/jasmine/spec/SpecRunner.html'],
                errorReporting: true
            }
        },
		
		min: {
			dist: {
				src: ['bin/jock.concat.' + src.version + '.js'],
				dest: 'bin/jock.min.' + src.version + '.js'
			}
		}
	});

    grunt.loadNpmTasks('grunt-jasmine-task');
	grunt.registerTask('default', 'concat lint:dest jasmine min');
};

