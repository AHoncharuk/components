
$('.field-select').each((i, item) => {
  const $item = $(item)
  const isDisabled = $item.hasClass('field-select--disabled')

  if (isDisabled) {
    $item
      .find('.field-select__input')
      .attr('disabled', true)
  }
})
