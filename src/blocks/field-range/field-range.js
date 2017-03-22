$('.field-range').each((i, item) => {
  const $item = $(item)
  const isDisabled = $item.hasClass('field-range--disabled')

  if (isDisabled) {
    $item
      .find('.field-range__input')
      .attr('disabled', true)
  }
})
