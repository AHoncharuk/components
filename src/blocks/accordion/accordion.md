## Подключение
Что бы использовать блок "accordion", его необходимо подключить в кофиге проекта(project.config.json).

### Зависимости
Зависит от блоков(должны быть подключены в конфиге):
- collapse
- card

## Использование
Аккордеон взаимодействует с блоками "card". Предусмотрено два варианта использования:

### Данные передаются через параметры
В этом случае в параметрах акордеона указывается id(идентификатор общего блока),  а также items, для них указывается:
- текст для хедера,
- текст для заголовка,
- текстовое описание.
- свойство show = true, - блок будет открыть после загрузки страницы

<pre>
+accordion({
  id: 'accordion',
  items: [{
    header: 'Первый блок',
    text: 'Ура, я первый'
  },
  {
    show: true,
    header: 'Второй блок',
    text: 'Опять второй'
  },
  {
    header: 'Третий блок',
    text: 'Ну, третьим быть тоже неплохо'
  }]
})
</pre>

### Данные передаются через дочерние блоки "card"
В этом случае для аккордеона следует указать только id.

Для блоков "card" указываются:
- id(идентификатор общего блока)
- порядковое число блока "card"
- свойство show = true, - блок будет открыть после загрузки страницы
- текст для хедера,
- текст для заголовка (необязательно),
- текстовое описание (необязательно).

В качестве основного контента можно передавать любую разметку.

<pre>
+accordion({ id: 'accordion'})
  +card({
    accId: 'accordion',
    index: 0,
    show: true,
    header: 'Первый блок'
  }) Любой контент
  +card({
    accId: 'accordion',
    index: 1,
    header: 'Второй блок'
  }) Любой контент
</pre>



## HTML Разметка

<pre>
<div id="accordion" role="tablist" aria-multiselectable="false">
    <div class="card">
        <div class="card__header" role="tab">
            <a class="link" href="#accordion-0" data-toggle="collapse" data-parent="#accordion" aria-expanded="true" aria-controls="accordion-0">Первый блок</a>
        </div>
        <div class="card__collapse collapse collapse--show" id="accordion-0" role="tabpanel" aria-labelledby="accordionheading-0">
            <div class="card__block">
                <p class="card__text">Ура, я первый</p>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="card__header" role="tab">
            <a class="link collapsed" href="#accordion-1" data-toggle="collapse" data-parent="#accordion" aria-expanded="false" aria-controls="accordion-1">Второй блок</a>
        </div>
        <div class="card__collapse collapse" id="accordion-1" role="tabpanel" aria-labelledby="accordionheading-1">
            <div class="card__block">
                <p class="card__text">Опять второй</p>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="card__header" role="tab">
            <a class="link collapsed" href="#accordion-2" data-toggle="collapse" data-parent="#accordion" aria-expanded="false" aria-controls="accordion-2">Третий блок</a>
        </div>
        <div class="card__collapse collapse" id="accordion-2" role="tabpanel" aria-labelledby="accordionheading-2">
            <div class="card__block">
                <p class="card__text">Ну, третьим быть тоже неплохо</p>
            </div>
        </div>
    </div>
</div>
</pre>
