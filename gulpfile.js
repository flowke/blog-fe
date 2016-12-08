const gulp = require('gulp'),
    clean = require('gulp-clean'),
    sequence = require('gulp-sequence');

gulp.task('move',['clean'],function(){
    return gulp.src(['src/static/image/*','./framework/vendor/**','src/static/fonts/*'])
    .pipe(gulp.dest('dist/public/assets'));
});

gulp.task('mvIndx', ()=>{
    gulp.src('src/page/index/index.html')
    .pipe(gulp.dest('dist/'))
} )

gulp.task('clean', function(){
    return gulp.src('./dist/')
    .pipe(clean({force: true}));
});

//gulp-run-sequence

gulp.task('cleanAssets', function() {
    return gulp.src('/Applications/MAMP/htdocs/waterfall/public/assets/')
        .pipe(clean({force: true}));
});

gulp.task('toDist', ['cleanAssets'], ()=>{

    gulp.src('./dist/public/assets/**')
    .pipe(gulp.dest('/Applications/MAMP/htdocs/waterfall/public/assets/'));

    gulp.src('./dist/index.html')
    .pipe(gulp.dest('/Applications/MAMP/htdocs/waterfall/app/view/home/'))
    .pipe(gulp.dest('/Applications/MAMP/htdocs/waterfall/public/'));
});

//gulp.task('dist', sequence('cleanAssets', 'toDist'));

gulp.task('watch',() => {
    gulp.watch('dist/**',['toDist']);
});
