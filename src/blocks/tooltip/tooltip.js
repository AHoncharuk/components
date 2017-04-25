import tooltip from './tooltip.lib'
//
$('[data-toggle="tooltip"]').tooltip(options)

$('[data-toggle="tooltip"]').on('shown.bs.tooltip', function () {
  console.log('tadaa');
})
