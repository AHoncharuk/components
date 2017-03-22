$('.field-toggler').each((i, item) => {
  const $item = $(item)
  const isDisabled = $item.hasClass('field-toggler--disabled')

  if (isDisabled) {
    $item
      .find('.field-toggler__input')
      .attr('disabled', true)
  }
})
