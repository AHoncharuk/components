
// Генератор файлов блока

// Использование: node createBlock.js [имя блока] [доп. расширения через пробел]

import { fileExist, uniqueArray } from './tasks/utils/utils.js'
import fs from 'fs'
import projectConfig from './project.config.json'
import mkdirp from 'mkdirp'

const dirs = projectConfig.dirs
const blockName = process.argv[2] // получим имя блока
const defaultExtensions = ['scss', 'pug', 'img'] // расширения по умолчанию
const extensions = uniqueArray(defaultExtensions.concat(process.argv.slice(3))) // добавим введенные при вызове расширения (если есть)

// Если есть имя блока
if (blockName) {

  const dirPath = dirs.srcPath + dirs.blocksDirName + '/' + blockName + '/'  // полный путь к создаваемой папке блока создаем
  mkdirp(dirPath, (err) => {

    // Если какая-то ошибка — покажем
    if (err) {
      console.error('[NTH] Отмена операции: ' + err)
    } else {   // Нет ошибки
      console.log('[NTH] Создание папки ' + dirPath + ' (если отсутствует)')

      // Обходим массив расширений и создаем файлы, если они еще не созданы
      extensions.forEach((extention) => {

        const filePath = dirPath + blockName + '.' + extention // полный путь к создаваемому файлу
        let fileContent = ''  // будущий контент файла
        let fileCreateMsg = '' // будущее сообщение в консоли при создании файла

        // Если это SCSS
        if (extention === 'scss') {
          fileContent = '// В этом файле должны быть стили только для БЭМ-блока ' + blockName + ', его элементов, \n// модификаторов, псевдоселекторов, псевдоэлементов, @media-условий...\n// Не пишите здесь другие селекторы.\n\n.' + blockName + ' {\n  \n}\n'

          // Добавим созданный файл
          let hasThisBlock = false
          for (let block in projectConfig.blocks) {
            if (block === blockName) {
              hasThisBlock = true
              break
            }
          }
          if (!hasThisBlock) {
            projectConfig.blocks[blockName] = []
            const newPackageJson = JSON.stringify(projectConfig, '', 2)
            fs.writeFileSync('./project.config.json', newPackageJson)
            fileCreateMsg = '[NTH] Подключение блока добавлено в project.config.json'
          }
        } else if (extention === 'pug') { // Если это PUG
            fileContent = 'mixin' + ' ' + blockName + '()\n' + ' +b.' + blockName + '&attributes(attributes)\n' + ' block'
            fileCreateMsg = blockName
        } else if (extention === 'js') { // Если это JS
          fileContent = '// (function(){\n// код\n// }());\n'
        } else if (extention === 'spec.js') {
          fileContent = `// import { expect } from 'chai'\n// import { function } from './${blockName}'\n// describe('', () => {\n// it('', () => {\n// expect.equal(function, 10)\n// })\n// })\n`
        } else if (extention == 'img') { // Если нужна подпапка для картинок
          const imgFolder = dirPath + 'img/'
          if (fileExist(imgFolder) === false) {
            mkdirp(imgFolder, function (err) {
              if (err) {
                console.error(err)
              } else {
                console.log('[NTH] Создание папки: ' + imgFolder + ' (если отсутствует)')
              }
            })
          } else {
            console.log('[NTH] Папка '+imgFolder+' НЕ создана (уже существует) ')
          }
        }

        // Создаем файл, если он еще не существует
        if (fileExist(filePath) === false && extention !== 'img') {
          fs.writeFile(filePath, fileContent, (err) => {
            if (err) {
              return console.log('[NTH] Файл НЕ создан: ' + err)
            }
            console.log('[NTH] Файл создан: ' + filePath)
            if (fileCreateMsg) {
              console.warn(fileCreateMsg)
            }
          })
        } else if (extention !== 'img') {
          console.log('[NTH] Файл НЕ создан: ' + filePath + ' (уже существует)')
        }
      })
    }
  })
} else {
  console.log('[NTH] Отмена операции: не указан блок')
}
