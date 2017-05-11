## Подключение
Что бы использовать блок "owl.carousel", его необходимо подключить в кофиге проекта(project.config.json).

## Использование

### PUG

<pre>
+owl-carousel({
  id: 'owl-carousel',
  items: [
    {
      content: 'Slide 1'
    },
    {
      content: 'Slide 2'
    },
    {
      content: 'Slide 3'
    }
  ]
})
</pre>

### Javascript

<pre>
$('#owl-carousel').owlCarousel({
  loop:true,
  margin:10,
  nav:true,
  responsive:{
    0:{
      items:1
    },
    600:{
      items:3
    },
    1000:{
      items:5
    }
  }
})
</pre>

Подробная документация по  <a href="https://owlcarousel2.github.io/OwlCarousel2/">Этой ссылке</a>
