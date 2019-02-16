const {
  parallel,
  src,
  dest
} = require("gulp"),
pump = require('pump'),
sass = require('gulp-sass'),
// concat = require('gulp-concat'),
ts = require("gulp-typescript"),
base = "./app/",
script = base + "scripts/",
appUrl = {
  bg: script + "background/",
  contentJs: script + "content/",
  popup: script + "popup/",
  options: script + "options/",
  allScss: base + "scss/",
  images: base + "images/",
  xtras: base + "others/"
},
distUrl = "./dist",
contentJs = [
  "utils",
  "main",
  "mode",
  "view"
],
allScss = [
  "content",
  "popup",
  "options"
];

contentJs.forEach((f, i, cf) => {
  cf[i] = appUrl.contentJs + f + ".ts";
});

allScss.forEach((f, i, cf) => {
  cf[i] = appUrl.allScss + f + ".scss";
});

const handleBg = function (cb) {
  pump([
    src([appUrl.bg + 'bgCode.ts', appUrl.bg + 'background.ts', appUrl.bg + 'cmOptions.ts']),
    ts({
      outFile: 'bg.min.js'
    }),
    dest(distUrl)
  ], cb);
},
handleContentJs = function (cb) {
  pump([
    src(contentJs),
    ts({
      outFile: 'content.min.js'
    }),
    dest(distUrl)
  ], cb);
},
handleContentCss = function(cb) {
  pump([
    src(allScss),
    sass().on('error', sass.logError),
    dest(distUrl)
  ], cb);
},
handleOptionsJs = function () {
  return src(appUrl.options + '**/*.ts')
  .pipe(ts())
  .pipe(dest(distUrl));
},
handlePopupJs = function () {
  return src(appUrl.popup + '**/*.ts')
  .pipe(ts())
  .pipe(dest(distUrl));
},
copyImages = function() {
  return src(appUrl.images + '**/*.*')
  .pipe(dest(distUrl + "/images"));
},
copyMeta = function (cb) {
  return src([
    appUrl.options + '*.*',
    appUrl.popup + '*.*',
    appUrl.xtras + '*.*'
  ])
  .pipe(dest(distUrl));
};

// Default Build task
exports.default = parallel(handleBg, 
  handleContentJs,
  handleOptionsJs,
  handlePopupJs,
  handleContentCss,
  copyImages,
  copyMeta);
