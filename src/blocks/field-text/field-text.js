$('.field-text').each((i, item) => {
  const $item = $(item)
  const isDisabled = $item.hasClass('field-text--disabled')

  if (isDisabled) {
    $item
      .find('.field-text__input')
      .attr('disabled', true)
  }
})
