## Пример Разметки

mixin modal()
  +b(id='myModal' class='modal modal--fade' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true')&attributes(attributes)
    +e(class='dialog' role='document')
      +e(class='content')
        +e(class='header')
          +e('h3')(id='exampleModalLabel' class='title') Modal title
          +e('button')(class='close' data-dismiss='modal', aria-label='Close')
        +e(class='body')
          | ...
        +e(class='footer')
          | ...

## Пример вызова

+btn('button')(data-toggle='modal' data-target='#myModal') Открыть

## Прокрутка длинного контента

Когда модальное окно становится длиньше, чем вьюпорт устройства, контент в модальном окне начинается прокручиваться независимо от основного контента
