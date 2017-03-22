$('.field-radio').each((i, item) => {
  const $item = $(item)
  const isDisabled = $item.hasClass('field-radio--disabled')

  if (isDisabled) {
    $item
      .find('.field-radio__input')
      .attr('disabled', true)
  }
})
