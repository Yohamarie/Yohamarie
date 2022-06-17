module.exports = function (grunt) {

require('time-grunt')(grunt);
require('jit-grunt') (grunt,{
useminPrepare: 'grunt-usemin'
});

grunt.initconfig({
sass: {
dist:{
files: [{
expand:true,
cwd: 'css',
src:['*.scss'],
dest:'css',
ext: '.css'
}]
}
}

watch:{
files:['css/*.scss'],	
tasks:['css']
},

browserSync: {
dev: {
bsFiles: { //browser files
src: [
'css/*.scss',
'*.html',
'js/*.js'
]
},

options: {
watchTasks: true,
server: {
baseDir: './' //Directorio base para nuestro servidor
}
}
},

imagemin: {
dynamic:{
files: [{
expand:true,
cwd: './',
src: 'images/*.{png.gif.jpg.jpeg}',
dest: 'dist/'
}]
}
},

copy: {
html: {
files: [{
expand: true,
dot:true,
cwd:'./',
src: ['*.html'],
dest: 'dist'
}]
},

fonts:  {
files: [
{ 

//for font-awesome
expand: true,
dot: true,
cwd: 'node_modules/open-iconic/font',
dest: 'dist'
}]
}
},

clean: {
build: {
src: ['dist/']
}
},

cssmin: {
dist: {}
},

uglify: {
dist: {}
},

filerev: {
options: {
encoding: 'utf8'
algotithm: 'md5'
lenght: 20
},


release: {
//filerevrelease hashes(mdS) all assets (images,js and css)
// in dist directory
files:  [{
src: [
'dist/js/*.js',
'dist/css/*.css',
] 
}] 
}
};

concat: {
options: {
separator: ';'
},
dist: {}
},

useminPrepare: {
foo: {
dest: 'dist'
src: ['index.html','contactanos.html','precios.html','nuestrosproductos.html']
},

options: {
flow: {
steps: {
css: ['cssmin'],
js: ['uglify']
},

post: {
css: [{
name: 'cssmin',
createConfig: function(context,block) {
var generated = context.options.generated;
generated.options = {
KeepSpecialComments: 0,
rebase: false
}
}
}] 
}
}
}
},

usemin: {
html: ['dist/index.html','dist/contactanos.html','dist/precios.html','dist/nuestrosproductos.html'],
options: {
assetsDir: ['dist', 'dist/css', 'dist/js']
}
}
});

grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-browser-sync');
grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.registerTask('css',['sass']);
grunt.registerTask('default',['browserSync','watch'])
grunt.registerTask('img:compress',['imagemin'])
grunt.registerTask('build', [
'clean',
'copy',
'imagemin',
'useminPrepare',
'concat',
'cssmin',
'uglify',
'filerev',
'usemin'
])

};