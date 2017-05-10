import Swipe from 'swipejs'

window.mySwipe = Swipe(document.getElementById('swipe-slider'), {
  startSlide: 0,
  speed: 400,
  auto: 3000,
  draggable: true,
  continuous: true,
  disableScroll: true,
  stopPropagation: true,
  callback: function(index, elem, dir) {},
  transitionEnd: function(index, elem) {}
})
