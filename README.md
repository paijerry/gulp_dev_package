
Gulp Basic Sample說明
---

# 資料夾結構

- build/
- config/
  - myPath.js
- dev/
  - images/*
  - js/*.js
  - scss/*.scss
  - *.pug
- node_modules/
- vendor/
- .babelrc
- .eslintrc
- gulpfile.js
- package.json
- webpack.config.js

# 各資料用途

**build/**
存放打包後檔案的資料夾，也就是放到正式環境的資料。

**config/**
存放開發包設定檔

**config/myPath.js**
路徑設定檔

**dev/**
開發用資料夾

**dev/images/\***
圖片放置處

**dev/js/*.js**
JavaScript放置處（可使用JavaScript es6+）

**dev/scss/*.scss**
scss放置處（css處理器）

**dev/*.pug**
pug放置處（html樣板語法）

**node_modules/**
使用```npm i```安裝後出現，node packages放置處，僅開發和打包會用到，不須放到正式環境。

**vendor/**
第三方工具放置處

**.babelrc**
支援JavaScript es6+語法的設定檔

**.eslintrc**
語法規則檢查設定檔

**gulpfile.js**
Gulp設定檔

**package.json**
本專案說明檔（**內含依賴套件清單**、**自訂指令**、名稱、描述、版本...）

**webpack.config.js**
webpack設定檔

# 了解開發包的使用技術
- Gulp（Task Runner）
- Webpack（Just for packaging JavaScript）
- es6 +的module以及種種概念

# 開發過程會用到的技術
- pug / jade（jade is pug's old name）
- sass / scss（We use scss）
- JavaScript es6+ / jQuery（You can use es5, too.）

# 如何使用

## 初始

1. 複製資料夾，並改名為專案名稱
2. 修改「package.json」內容（name, version, description, author）
3. 使用「npm i」安裝package.json中相關的依賴套件。
4. 依需求調整「config/myPath.js」。

## 開發

執行「npm run dev」運行開發環境進行開發。（中斷使用「ctl + c」）

## 完成

完成開發後，使用「npm run build」進行production的打包。

*指令「npm run build, npm run dev」設定放在「package.json」的scripts*

## 引入JavsSCript套件

參考config/myPath.js中的script.plugins設定
```javascript
module.exports.fileType = {
...
  plugins: [
    `${vendorRoot}/browser-polyfill-5.8.34.min.js`,
    '${pluginsPath}/some_js.js',
  ],
...
```

## 引入套件依賴的其他檔案

### css / scss

參考dev/scss/vender.scss
```scss
// -------------------------------------
//   Plugins
// -------------------------------------
@import '../../../plugins/font-awesome/scss/font-awesome';
@import '../../../plugins/path/to/you_scss_or_css';
```
### 圖片

```javascript
module.exports.fileType = {
...
  image: [
    `${pluginsPath}/**/*.{gif,jpg,png,ico,svg}`,
    '/path/to/you_files_folder/**/*',
  ],
...
```
### 其他

如果要複製到build的不只圖片呢
1. 在gulpfile.js新增Task
```javascript
gulp.task('you-task-name', () => {
  gulp.src(<path_to_your_files>)
    .pipe(<output_for_your_files>)
    .pipe(browserSync.reload({ stream: true }));
});
```
**path_to_your_files**
要複製的檔案路徑，可以用字串或陣列（多組）方式表示。

**output_for_your_files**
輸出的路徑，通常是build/some_folder_name。

*建議將路徑統一放在myPath.js上，方便管理。*

2. 將Task新增到執行佇列中
```javascript
const devTasks = ['browser-sync', 'watch'];
const buildTasks = ['to-html', 'to-css', 'webpack', 'sync-scripts', 'sync-images', <YOUR NEW TASK>]; // <--- HERE
```

3. 執行「npm run build」或「npm run dev」看看是否build打包中有該檔案。
