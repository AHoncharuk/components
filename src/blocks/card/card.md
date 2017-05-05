## Подключение
Что бы использовать блок "card", его необходимо подключить в кофиге проекта(project.config.json).

## Использование
Данные для "card" передаются частино через параметры, и в качестве вложенных блоков.

### Через параметры передаются:
- Текст для header
- Текст для title (можно задать как вложенный)
- Текст для text (можно задать как вложенный)
- данные для картинки(image):
  - положение:
     - top(вверху блока) для card нужно указать модификатор card--img-top,
     - bottom(внизу блока) для card нужно указать модификатор card--img-bottom,
     - overlay(картинка распологается под контентом).
  - путь до картинки
  - имя

### Положение картинки: overlay
<pre>
+card({
  header: 'Это хедер',
  title: 'Это заголовок',
  text: 'Это текст',
  image: {
    position: 'overlay',
    src: 'img/car.jpg',
    name: 'Super Car'
  }
})
</pre>

### Положение картинки: top
<pre>
+card({
  header: 'Это хедер',
  title: 'Это заголовок',
  text: 'Это текст',
  image: {
    position: 'overlay',
    src: 'img/car.jpg',
    name: 'Super Car'
  }
})(class='card-img--top')
</pre>

### Положение картинки: bottom
<pre>
+card({
  header: 'Это хедер',
  title: 'Это заголовок',
  text: 'Это текст',
  image: {
    position: 'overlay',
    src: 'img/car.jpg',
    name: 'Super Car'
  }
})(class='card-img--bottom')
</pre>

## Использование "card", для реализации аккордеона
Читайте в подробном описании на <a href="https://github.com/ArtNekki/components/blob/experiments/src/blocks/accordion/accordion.md">Этой странице</a>
