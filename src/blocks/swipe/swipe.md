## Подключение
Что бы использовать блок "swipe", его необходимо подключить в кофиге проекта(project.config.json).

## Использование

### PUG

<pre>
+swipe({
  id: 'swipe-slider',
  items: [
    {
      text: 'Slide 1'
    },
    {
      text: 'Slide 2'
    },
    {
      text: 'Slide 3'
    }
  ]
})
</pre>

### Javascript

<pre>
window.mySwipe = new Swipe(document.getElementById('swipe-slider'), {
  startSlide: 2,
  speed: 400,
  auto: 3000,
  continuous: true,
  disableScroll: false,
  stopPropagation: false,
  callback: function(index, elem) {},
  transitionEnd: function(index, elem) {}
});
</pre>

<a href="https://github.com/thebird/Swipe">Документация по этой ссылке</a>
