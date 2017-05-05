## Подключение
Что бы использовать блок "collapse", его необходимо подключить в кофиге проекта(project.config.json).

## Использование
Можно использовать либо тег `a` с атрибутом `href`, или  тег `button` с атрибутом `data-target`. В обоих случаях необходим атрибут `data-toggle="collapse"`.

Плагин  `collapse` использует несколько классов для работы:

- `.collapse` скрывает контент
- `.collapse--show` показывает контент
- `.collapse--collapsing` добавляется, когда транзакция начинается и удаляется, когда транзакция завершается

<pre>
+btn('link')(url='#content' data-toggle='collapse') Collapse
</pre>

<pre>
+collapse()(id='content') Текст Текст Текст
</pre>

### С помощью атрибутов
Чтобы плагин заработал нужно для кнопки или ссылки добавить атрибуты `data-toggle="collapse"` и `data-target`. Также необходимо добавить класс `collapse` на сворачиваемый элемент. Если хотите, чтобы сворачиваемый элемент был по-умолчанию открыт, добавте для него класс `.collapse--show`

### С помощью javascipt

Ручная инициализация:
$('.collapse').collapse()

### Опции
Опции могут быть переданы либо через атрибуты, либо через javascript.

<table class="table table-bordered table-striped table-responsive">
  <thead>
   <tr>
     <th style="width: 100px;">Имя</th>
     <th style="width: 50px;">Тип</th>
     <th style="width: 50px;">По-умолчанию</th>
     <th>Описание</th>
   </tr>
  </thead>
  <tbody>
   <tr>
     <td>parent</td>
     <td>selector</td>
     <td>false</td>
     <td>Только один элемент может быть открыт в настоящий момент (аккордеон)</td>
   </tr>
   <tr>
     <td>toggle</td>
     <td>boolean</td>
     <td>true</td>
     <td>Переключает элементы при событии</td>
   </tr>
  </tbody>
</table>

### Методы

#### `.collapse(options)`

$('#myCollapsible').collapse({
  toggle: false
})

#### `.collapse('toggle')`
Скрывает или показывает контент

#### `.collapse('show')`
Показывает контент

#### `.collapse('hide')`
Скрывает контент

### События
У класса Collaspse есть дополнительные методы, расширяющие его поведение:

<table class="table table-bordered table-striped table-responsive">
  <thead>
   <tr>
     <th style="width: 150px;">Тип события</th>
     <th>Описание</th>
   </tr>
  </thead>
  <tbody>
   <tr>
     <td>show.bs.collapse</td>
     <td>Это событие срабатывает сразу же после того, как метод <code>show</code> был вызван.</td>
   </tr>
   <tr>
     <td>shown.bs.collapse</td>
     <td>Это событие срабатывает, когда соврачиваемый контент ставновится видимым для пользователя(будет ждать окончание css-транзакции).</td>
   </tr>
   <tr>
     <td>hide.bs.collapse</td>
     <td>Это событие срабатывает сразуже после того, как метод <code>hide</code> был вызван.</td>
   </tr>
   <tr>
     <td>hidden.bs.collapse</td>
     <td>Это событие срабатывает, когда соврачиваемый контент ставновится невидимым для пользователя(будет ждать окончание css-транзакции).</td>
   </tr>
  </tbody>
</table>


<pre>
$('#myCollapsible').on('hidden.bs.collapse', function () {
  // do something…
})
</pre>
