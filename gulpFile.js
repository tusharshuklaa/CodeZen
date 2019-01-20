const {
  parallel,
  series,
  src,
  dest
} = require("gulp"),
pump = require('pump'),
sass = require('gulp-sass'),
concat = require('gulp-concat'),
base = "./app/",
appUrl = {
  bg: base + "background/",
  contentJs: base + "content/",
  allScss: base + "scss/",
  images: base + "images/",
  options: base + "options/",
  popup: base + "popup/",
  xtras: base + "xtras/"
},
distUrl = "./dist",
contentJs = [
  "utils",
  "main"
],
allScss = [
  "content",
  "popup",
  "options"
];

contentJs.forEach((f, i, cf) => {
  cf[i] = appUrl.contentJs + f + ".js";
});

allScss.forEach((f, i, cf) => {
  cf[i] = appUrl.allScss + f + ".scss";
});

const handleBg = function (cb) {
  pump([
    src([appUrl.bg + 'bgCode.js', appUrl.bg + 'background.js']),
    concat({
      path: 'bg.min.js'
    }),
    dest(distUrl)
  ], cb);
},
handleContentJs = function (cb) {
  pump([
    src(contentJs),
    concat({
      path: 'content.min.js'
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
  handleContentCss, 
  copyImages, 
  copyMeta);
