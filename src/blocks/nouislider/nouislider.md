## Подключение
Что бы использовать блок "nouislider", его необходимо подключить в кофиге проекта(project.config.json).

## Использование

### PUG

<pre>
+nouislider({
  id: 'slider'
})
</pre>

### Javascript

<pre>
const slider = document.getElementById('slider')

noUiSlider.create(slider, {
  start: [20, 80],
  connect: true,
  range: {
    min: 0,
    max: 100
  }
})
</pre>

<a href="https://refreshless.com/nouislider/">Документация по этой ссылке</a>
