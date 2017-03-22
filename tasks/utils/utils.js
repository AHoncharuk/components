// Получение настроек папок из package.json
import browserSyncPl from 'browser-sync'
import fs from 'fs'
import pjson from '../../package.json'

export const browserSync = browserSyncPl.create()
export const dirs = pjson.configProject.dirs
export const lists = getFilesList(pjson.configProject)


// Запуск `port=3004 npm start` приведет к запуску сервера обновлений на 3004 порту и всей обычной автоматизации
export const port = process.env.port ? process.env.port : 3000
// Запуск `NODE_ENV=production npm start [задача]` приведет к сборке без sourcemaps
export const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'dev'

function getFilesList(config) {

  let res = {
    'css': [],
    'js': [],
    'img': []
  };

  // Style
  for (let blockName in config.blocks) {
    res.css.push(config.dirs.srcPath + config.dirs.blocksDirName + '/' + blockName + '/' + blockName + '.scss');
    if(config.blocks[blockName].length) {
      config.blocks[blockName].forEach(function(elementName) {
        res.css.push(config.dirs.srcPath + config.dirs.blocksDirName + '/' + blockName + '/' + blockName + elementName + '.scss');
      });
    }
  }
  res.css = res.css.concat(config.addCssAfter);
  res.css = config.addCssBefore.concat(res.css);

  // JS
  for (let blockName in config.blocks) {
    res.js.push(config.dirs.srcPath + config.dirs.blocksDirName + '/' + blockName + '/' + blockName + '.js');
    if(config.blocks[blockName].length) {
      config.blocks[blockName].forEach(function(elementName) {
        res.js.push(config.dirs.srcPath + config.dirs.blocksDirName + '/' + blockName + '/' + blockName + elementName + '.js');
      });
    }
  }
  res.js = res.js.concat(config.addJsAfter);
  res.js = config.addJsBefore.concat(res.js);

  // Images
  for (let blockName in config.blocks) {
    res.img.push(config.dirs.srcPath + config.dirs.blocksDirName + '/' + blockName + '/img/*.{jpg,jpeg,gif,png,svg}');
  }
  res.img = config.addImages.concat(res.img);

  return res;
}
// Проверка существования файла и его размера (размер менее 2байт == файла нет)
export function fileExistAndHasContent(path) {
  try {
    fs.statSync(path)
    if (fs.statSync(path).size > 1) {
      return true
    } else {
      return false
    }
  } catch (err) {
    return !(err && err.code === 'ENOENT')
  }
}

// Проверка существования файла
export function fileExist(path) {
  try {
    fs.statSync(path)
  } catch (err) {
    return !(err && err.code === 'ENOENT')
  }
}

// Оставить в массиве только уникальные значения (убрать повторы)
export function uniqueArray(arr) {
  const objectTemp = {}
  for (let i = 0; i < arr.length; i++) {
    const str = arr[i]
    objectTemp[str] = true // запомнить строку в виде свойства объекта
  }
  return Object.keys(objectTemp)
}

// Перезагрузка в браузере
export function reload(done) {
  browserSync.reload()
  done()
}
