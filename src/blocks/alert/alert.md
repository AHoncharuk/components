## Подключение
Что бы использовать блок "alert", его необходимо подключить в кофиге проекта(project.config.json).

## Использование
Данные для "alert" передаются частино через параметры, и в качестве вложенных блоков.

Через параметры передаются:
- Текст для title
- Параметр dismiss, который если равен `true`, добавляет кнопку для закрытия блока alert

В качестве вложенных блоков можно передавать любую разметку.

 <pre>
 +alert({
   title: 'Заголовок',
   dismiss: true
 })
   Вложенная разметка
 </pre>

## Закрытие `alert`

### С помощью data-атрибутов

Для того чтобы `alert` можно было закрывать нажатием на кнопку, необходимо:
- добавить для  `alert` css-класс `alert--dismissible`
- для того чтобы закрытие было анимировано,  css-классы: `alert--fade` и `alert--show` должны быть добавлены на блок `alert`
- для кнопки закрытия должен быть указан атрибут `data-dismiss="alert"`

### С помощью javascript

<pre>
$('.alert').alert()
</pre>

## Методы

<table>
  <thead>
    <tr>
      <th>Метод</th>
      <th>Описание</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code class="highlighter-rouge">$().alert()</code></td>
      <td>Позволяет закрывать alert при клике на элементе вложенном в него, у которого прописан css-класс `data-dismiss="alert"` (В нем нет необходимости, когда используется `data-api`)</td>
    </tr>
    <tr>
      <td><code class="highlighter-rouge">$().alert('close')</code></td>
      <td>Закрывает `alert`, удаляя его из DOM. Если для `alert` указан класс `alert--fade` и `alert--show`, то закрытие будет анимировано</td>
    </tr>
  </tbody>
</table>

## События
Функциональность плагина `alert` расширяется несколькими собитиями

<table>
  <thead>
    <tr>
      <th>Событие</th>
      <th>Описание</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code class="highlighter-rouge">close.bs.alert</code></td>
      <td>Событие запускается немедленно, после того как метод <code>close</code> был вызван</td>
    </tr>
    <tr>
      <td><code class="highlighter-rouge">closed.bs.alert</code></td>
      <td>Это событие запускается, после того как `alert` был закрыт (Ждет окончания css-транзакций)</td>
    </tr>
  </tbody>
</table>

<pre>
$('.alert').on('closed.bs.alert', function () {

})
</pre>
