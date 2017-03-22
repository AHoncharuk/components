// Генератор файлов блока

// Использование: node createBlock.js [имя блока] [доп. расширения через пробел]
import { dirs, fileExist, uniqueArray } from './tasks/utils/utils.js'
import fs from 'fs'               // будем работать с файловой системой
import mkdirp from 'mkdirp'       // зависимость

const blockName = process.argv[2]          // получим имя блока
const defaultExtensions = ['scss', 'pug'] // расширения по умолчанию
const extensions = uniqueArray(defaultExtensions.concat(process.argv.slice(3)))  // добавим введенные при вызове расширения (если есть)

// Если есть имя блока
if (blockName) {

  const dirPath = `${dirs.source}/blocks/${blockName}/` // полный путь к создаваемой папке блока
  mkdirp(dirPath, (err) => {                            // создаем

    // Если какая-то ошибка — покажем
    if (err) {
      console.error('Отмена операции: ' + err)
    } else { // нет ошибки, поехали
      console.log('Создание папки ' + dirPath + ' (создана, если ещё не существует)')

      // Читаем файл диспетчера подключений
      const connectManager = fs.readFileSync(`${dirs.source}/scss/style.scss`, 'utf8')

      // Делаем из строк массив, фильтруем массив, оставляя только строки с незакомментированными импортами
      const fileSystem = connectManager.split('\n').filter((item) => {
        if (/^(\s*)@import/.test(item)) {
          return true
        } else {
          return false
        }
      })

      // Обходим массив расширений и создаем файлы, если они еще не созданы
      extensions.forEach((extention) => {

        const filePath = `${dirPath}${blockName}.${extention}` // полный путь к создаваемому файлу
        let fileContent = ''                                 // будущий контент файла
        let SASSfileImport = ''                              // конструкция импорта будущего LESS
        let fileCreateMsg = ''                               // будущее сообщение в консоли при создании файла

        // Если это SASS
        if (extention === 'scss') {
          SASSfileImport = '@import \'' + dirs.source + '/blocks/' + blockName + '/' + blockName + '.scss\';'
          fileContent = '// Для импорта в диспетчер подключений: ' + SASSfileImport + '\n\n@import \'../../scss/variables.scss;\'     // только для удобства обращения к переменным\n\n\n.' + blockName + ' {\n  \n}\n'
          // fileCreateMsg = 'Для импорта стилей: ' + SASSfileImport

          // Создаем регулярку с импортом
          const reg = new RegExp(SASSfileImport, '')

          // Создадим флаг отсутствия блока среди импортов
          let impotrtExist = false

          // Обойдём массив и проверим наличие импорта
          for (let i = 0, j = fileSystem.length; i < j; i++) {
            if (reg.test(fileSystem[i])) {
              impotrtExist = true
              break
            }
          }

          // Если флаг наличия импорта по-прежнему опущен, допишем импорт
          if (!impotrtExist) {
            // Открываем файл
            fs.open(`${dirs.source}/scss/style.scss`, 'a', (err, fileHandle) => {
              // Если ошибок открытия нет...
              if (!err) {
                // Запишем в конец файла
                fs.write(fileHandle, `${SASSfileImport}\n`, null, 'utf8', (err) => { // (err, written)
                  if (!err) {
                    console.log(`В диспетчер подключений (${dirs.source}/scss/style.scss) записано: ${SASSfileImport}`)
                  } else {
                    console.log(`ОШИБКА записи в ${dirs.source}/scss/style.scss: ${err}`)
                  }
                })
              } else {
                console.log(`ОШИБКА открытия ${dirs.source}/scss/style.scss: ${err}`)
              }
            })
          } else {
            console.log(`Импорт НЕ прописан в ${dirs.source}/scss/style.scss (он там уже есть)`)
          }
        } else if (extention === 'pug') { // Если это PUG
          fileContent = 'mixin' + ' ' + blockName + '()\n' + ' +b.' + blockName + '&attributes(attributes)\n' + ' block'
          fileCreateMsg = blockName
        } else if (extention === 'js') { // Если это JS
          fileContent = '// (function(){\n// код\n// }());\n'
        } else if (extention === 'spec.js') {
          fileContent = `// import { expect } from 'chai'\n// import { function } from './${blockName}'\n// describe('', () => {\n// it('', () => {\n// expect.equal(function, 10)\n// })\n// })\n`
        } else if (extention === 'img') { // Если нужна подпапка для картинок
          const imgFolder = `${dirPath}img/`
          if (fileExist(imgFolder) === false) {
            mkdirp(imgFolder, (err) => {
              if (err) {
                console.error(err)
              } else {
                console.log(`Папка создана: ${imgFolder}`)
              }
            })
          } else {
            console.log('Папка НЕ создана (уже существует) ')
          }
        }

        // Создаем файл, если он еще не существует
        if (fileExist(filePath) === false && extention !== 'img') {
          fs.writeFile(filePath, fileContent, (err) => {
            if (err) {
              return console.log('Файл НЕ создан: ' + err)
            }
            console.log('Файл создан: ' + filePath)
            if (fileCreateMsg) {
              console.warn(fileCreateMsg)
            }
          })
        } else if (extention !== 'img') {
          console.log('Файл НЕ создан: ' + filePath + ' (уже существует)')
        }
      })
    }
  })
} else {
  console.log('Отмена операции: не указан блок')
}
