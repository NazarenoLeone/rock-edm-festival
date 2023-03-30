const { src , dest, watch, parallel } = require("gulp"); // gulp, lo instalamos en el package.json - require, forma de extraer el gulp

// CSS
const sass = require("gulp-sass")(require('sass'));
const plumber = require("gulp-plumber");
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

// Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

// Javascript
const terser = require('gulp-terser-js');

function css(done) {
    src('src/scss/**/*.scss') // Identificar el archivo de SASS (con src)
        .pipe( sourcemaps.init() )
        .pipe( plumber() )
        .pipe( sass() ) // Compilarlo
        .pipe( postcss([ autoprefixer(), cssnano() ]))
        .pipe( sourcemaps.write('.') )
        .pipe( dest("build/css") ); // Almacenarla en el disco duro (con dest)
    //pipe = accion que se realiza despues de otra


    done(); // Callback queque avisa a gulp cuando llegamos al final de la ejecución
}

function imagenes(done) {
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe( cache( imagemin(opciones) ) )
        .pipe( dest('build/img') )

    done();
}

function versionWebp(done) {

    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}') // Cuandoo buscas dos o mas formatos, lo pones entre llaves
        .pipe( webp(opciones) )
        .pipe( dest('build/img') )

    done();
}

function versionAvif(done) {

    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}') // Cuandoo buscas dos o mas formatos, lo pones entre llaves
        .pipe( avif(opciones) )
        .pipe( dest('build/img') )

    done();
}

function javascript(done) {
    src('src/js/**/*.js')
        .pipe( sourcemaps.init() )
        .pipe( terser() )
        .pipe( sourcemaps.write('.') )
        .pipe( dest('build/js') )

        done();
}

function dev(done) {
    watch('src/scss/**/*.scss', css);
    // **/* de forma recursiva va detectando todas las carpetas y archivos y buscando la extension .scss
    watch('src/js/**/*.js', javascript);
    done();    
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel( imagenes, versionWebp, versionAvif, javascript, dev );
