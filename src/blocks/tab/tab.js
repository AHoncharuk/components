import tab from './tab.lib'

$('.nav-tabs a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})
