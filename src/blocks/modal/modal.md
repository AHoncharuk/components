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

## Remove animation
For modals that simply appear rather than fade in to view, remove the .fade class from your modal markup.

## Accessibility
Be sure to add role="dialog" and aria-labelledby="...", referencing the modal title, to .modal, and role="document" to the .modal-dialog itself. Additionally, you may give a description of your modal dialog with aria-describedby on .modal.

## Usage
The modal plugin toggles your hidden content on demand, via data attributes or JavaScript. It also adds .modal--open to the <body> to override default scrolling behavior and generates a .modal__backdrop to provide a click area for dismissing shown modals when clicking outside the modal.

## Via data attributes
Activate a modal without writing JavaScript. Set data-toggle="modal" on a controller element, like a button, along with a data-target="#foo" or href="#foo" to target a specific modal to toggle.

## Via JavaScript
Call a modal with id myModal with a single line of JavaScript:
$('#myModal').modal(options)

## Options
Options can be passed via data attributes or JavaScript. For data attributes, append the option name to data-, as in data-backdrop="".

<table class="table table-bordered table-striped table-responsive">
  <thead>
   <tr>
     <th style="width: 100px;">Name</th>
     <th style="width: 50px;">Type</th>
     <th style="width: 50px;">Default</th>
     <th>Description</th>
   </tr>
  </thead>
  <tbody>
   <tr>
     <td>backdrop</td>
     <td>boolean or the string <code>'static'</code></td>
     <td>true</td>
     <td>Includes a modal-backdrop element. Alternatively, specify <code>static</code> for a backdrop which doesn't close the modal on click.</td>
   </tr>
   <tr>
     <td>keyboard</td>
     <td>boolean</td>
     <td>true</td>
     <td>Closes the modal when escape key is pressed</td>
   </tr>
   <tr>
     <td>focus</td>
     <td>boolean</td>
     <td>true</td>
     <td>Puts the focus on the modal when initialized.</td>
   </tr>
   <tr>
     <td>show</td>
     <td>boolean</td>
     <td>true</td>
     <td>Shows the modal when initialized.</td>
   </tr>
  </tbody>
</table>

## Methods

## Options
Activates your content as a modal. Accepts an optional options object.
$('#myModal').modal(options)

## Toggle
$('#myModal').modal('toggle')
Manually toggles a modal. Returns to the caller before the modal has actually been shown or hidden (i.e. before the shown.bs.modal or hidden.bs.modal event occurs).

## Show
$('#myModal').modal('show')
Manually opens a modal. Returns to the caller before the modal has actually been shown (i.e. before the shown.bs.modal event occurs).

## Hide
$('#myModal').modal('hide')
Manually hides a modal. Returns to the caller before the modal has actually been hidden (i.e. before the hidden.bs.modal event occurs).


## Events
Bootstrap’s modal class exposes a few events for hooking into modal functionality. All modal events are fired at the modal itself (i.e. at the <div class="modal">).

<table class="table table-bordered table-striped table-responsive">
  <thead>
   <tr>
     <th style="width: 150px;">Event Type</th>
     <th>Description</th>
   </tr>
  </thead>
  <tbody>
   <tr>
     <td>show.bs.modal</td>
     <td>This event fires immediately when the <code>show</code> instance method is called. If caused by a click, the clicked element is available as the <code>relatedTarget</code> property of the event.</td>
   </tr>
   <tr>
     <td>shown.bs.modal</td>
     <td>This event is fired when the modal has been made visible to the user (will wait for CSS transitions to complete). If caused by a click, the clicked element is available as the <code>relatedTarget</code> property of the event.</td>
   </tr>
   <tr>
     <td>hide.bs.modal</td>
     <td>This event is fired immediately when the <code>hide</code> instance method has been called.</td>
   </tr>
   <tr>
     <td>hidden.bs.modal</td>
     <td>This event is fired when the modal has finished being hidden from the user (will wait for CSS transitions to complete).</td>
   </tr>
  </tbody>
</table>
