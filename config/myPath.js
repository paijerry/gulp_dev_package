const path = require('path');

const srcRoot = path.resolve(__dirname, '../dev');
const destRoot = path.resolve(__dirname, '../build');

const websitesRoot = '..'; // 專案位置返回root位置的層級
const vendorRoot = './vendor';

module.exports.root = {
  websites: websitesRoot,
  src: srcRoot,
  dest: destRoot,
};

module.exports.fileType = {
  // 輸入路徑
  pug: {
    files: [
      `${srcRoot}/**/*.pug`,
      `!${srcRoot}/**/_*.pug`,
    ],
    output: destRoot,
    watch_files: [
      `${vendorRoot}/**/*.pug`,
      `${srcRoot}/**/*.pug`,
    ],
  },
  scss: {
    files: [
      `${srcRoot}/scss/layout.scss`,
      `${srcRoot}/scss/vender.scss`,
    ],
    output: `${destRoot}/css/`,
    watch_files: [
      `${vendorRoot}/**/*.scss`,
      `${srcRoot}/scss/**/*.scss`,
    ],
  },
  script: {
    files: `${srcRoot}/js/app.js`,
    plugins: [
      `${vendorRoot}/browser-polyfill-5.8.34.min.js`,
    ],
    output: `${destRoot}/js/`,
    watch_files: [
      `${vendorRoot}/**/*.js`,
      `${srcRoot}/js/**/*.js`,
    ],
  },
  image: {
    files: `${srcRoot}/images/**/*.{gif,jpg,png,ico,svg}`,
    output: `${destRoot}/images/`,
    watch_files: [
      `${vendorRoot}/**/*.{gif,jpg,png,ico,svg}`,
      `${srcRoot}/**/*.{gif,jpg,png,ico,svg}`,
    ],
  },
};
