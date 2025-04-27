const gulp = require('gulp')
const postcss = require('gulp-postcss')
const rename = require('gulp-rename')
const htmlMinifier = require('gulp-html-minifier')
const { exec } = require('child_process')
const puppeteer = require('puppeteer')

const paths = {
  resume: 'src/main/resources/resume.json',
  styles: 'target/resumejson/public/**/*.css',
}

function sortRules() {
  return gulp
    .src(paths.styles)
    .pipe(
      postcss([
        require('postcss-sorting')({
          'empty-lines-between-children-rules': 1,
        }),
      ])
    )
    .pipe(gulp.dest('target/resumejson/public'))
}

function styles() {
  return gulp
    .src('target/resumejson/public/style.css')
    .pipe(
      postcss([
        require('postcss-import'),
        require('postcss-preset-env')({
          stage: 0,
        }),
        require('postcss-reporter')({
          clearMessages: true,
        }),
        require('cssnano')({
          preset: 'default',
        }),
      ])
    )
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('public'))
}

function buildHtml(cb) {
  exec(
    'npx resume export public/index.html --resume src/main/resources/resume.json --theme .',
    function (err, stdout, stderr) {
      if (err) {
        console.error('Error exporting HTML with resume-cli:', err)
        console.error(stderr)
      }
      cb(err)
    }
  )
}

async function buildPdf() {
  const browser = await puppeteer.launch({
    headless: 'new',
  })
  const page = await browser.newPage()
  await page.goto(`file://${__dirname}/public/index.html`, {
    waitUntil: 'networkidle0',
  })
  await page.pdf({
    path: 'public/alec-rust-cv.pdf',
    margin: {
      top: '2cm',
      right: '2cm',
      bottom: '2cm',
      left: '2cm',
    },
  })
  await browser.close()
}

function minifyHtml() {
  return gulp
    .src('public/index.html')
    .pipe(
      htmlMinifier({
        caseSensitive: true,
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        minifyJS: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
      })
    )
    .pipe(gulp.dest('public'))
}

function copyJson() {
  return gulp
    .src(paths.resume)
    .pipe(rename('alec-rust-cv.json'))
    .pipe(gulp.dest('public'))
}

function watch() {
  gulp.watch(paths.resume, copyJson)
  gulp.watch(paths.styles, styles)
}

console.debug("Start pdf creation.");

gulp.task('sort-rules', sortRules)
gulp.task('styles', gulp.series(sortRules, styles))
gulp.task('build-html', buildHtml)
gulp.task('build-pdf', buildPdf)
gulp.task('minify-html', minifyHtml)
gulp.task('copy-json', copyJson)
gulp.task(
  'build',
  gulp.series('styles', 'copy-json', 'build-html', 'build-pdf', 'minify-html')
)
gulp.task('watch', gulp.series('styles', watch))
gulp.task('default', gulp.series('build'))

console.info("Finished pdf creation.");