$('.field-checkbox').each((i, item) => {
  const $item = $(item)
  const isDisabled = $item.hasClass('field-checkbox--disabled')

  if (isDisabled) {
    $item
      .find('.field-checkbox__input')
      .attr('disabled', true)
  }
})
