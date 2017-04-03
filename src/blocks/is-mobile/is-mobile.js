import isMobile from 'ismobilejs'

document.addEventListener('DOMContentLoaded', () => {
  if (isMobile !== undefined) {
    if (isMobile.any) {
      let rootClasses = ' is-mobile'
      for (let key in isMobile) {
        if (typeof isMobile[key] === 'boolean' && isMobile[key] && key !== 'any') {
          rootClasses += ` is-mobile--${key}`
        }
        if (typeof isMobile[key] === 'object' && key !== 'other') {
          for (let type in isMobile[key]) {
            if (isMobile[key][type]) {
              rootClasses += ` is-mobile--${key}-${type}`
            }
          }
        }
      }
      document.documentElement.className += rootClasses
    }
  } else {
    console.log('Классы для мобильных не добавлены: в сборке отсутствует isMobile.js')
  }
})
