import Pikaday from 'pikaday'

$('.field-date').each((i, item) => {
  const $item = $(item)
  const isDisabled = $item.hasClass('field-date--disabled')

  if (isDisabled) {
    $item
      .find('.field-date__input')
      .attr('disabled', true)
  }
})

const picker = new Pikaday({
  field: $('#date')[0],
  format: 'D MMM YYYY',
  onSelect: () => {
    // console.log(this.getMoment().format('Do MMMM YYYY'));
  }
})
