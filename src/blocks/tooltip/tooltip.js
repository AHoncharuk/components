import tooltip from './tooltip.lib'
//
$('[data-toggle="tooltip"]').tooltip()

$('[data-toggle="tooltip"]').on('shown.bs.tooltip', function () {
  console.log('tadaa')
})
