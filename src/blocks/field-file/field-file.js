import Parsley from 'parsleyjs';

/*
  Форма: работа стилизованного input[type="file"]
  Автор: Osvaldas Valutis, www.osvaldas.info (адаптировано под используемую разметку)
  Available for use under the MIT License
*/

;(function () {
  var inputs = document.querySelectorAll('.field-file__input');
  Array.prototype.forEach.call( inputs, function( input )
  {
    var label  = input.closest('.field-file').querySelector('.field-file__name-text'),
        labelVal = label.innerHTML;

    input.addEventListener( 'change', function( e ) {
      var fileName = '';
      if( this.files && this.files.length > 1 ) {
        fileName = (this.getAttribute('data-multiple-caption') || '').replace( '{count}', this.files.length );
      }
      else {
        fileName = e.target.value.split( '\\' ).pop();
      }

      if(fileName) {
        label.innerHTML = fileName;
      }
      else {
        label.innerHTML = labelVal;
      }
    });
  });
}());

$('.field-file').each((i, item) => {
  let $item = $(item);
  let isDisabled = $item.hasClass('field-file--disabled');

  if(isDisabled) {
    $item
      .find('.field-file__input')
      .attr('disabled', true);
  }
});

window.Parsley.addValidator('maxFileSize', {
  validateString: function(_value, maxSize, parsleyInstance) {
    if (!window.FormData) {
      alert('You are making all developpers in the world cringe. Upgrade your browser!');
      return true;
    }
    var files = parsleyInstance.$element[0].files;
    return files.length != 1  || files[0].size <= maxSize * 1024;
  },
  requirementType: 'integer',
  messages: {
    en: 'This file should not be larger than %s Kb',
    fr: "Ce fichier est plus grand que %s Kb."
  }
});
