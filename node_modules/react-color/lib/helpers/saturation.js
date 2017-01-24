'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateChange = calculateChange;
function calculateChange(e, skip, props, container) {
  !skip && e.preventDefault();
  var containerWidth = container.clientWidth;
  var containerHeight = container.clientHeight;
  var x = typeof e.pageX === 'number' ? e.pageX : e.touches[0].pageX;
  var y = typeof e.pageY === 'number' ? e.pageY : e.touches[0].pageY;
  var left = x - (container.getBoundingClientRect().left + window.pageXOffset);
  var top = y - (container.getBoundingClientRect().top + window.pageYOffset);

  if (left < 0) {
    left = 0;
  } else if (left > containerWidth) {
    left = containerWidth;
  } else if (top < 0) {
    top = 0;
  } else if (top > containerHeight) {
    top = containerHeight;
  }

  var saturation = left * 100 / containerWidth;
  var bright = -(top * 100 / containerHeight) + 100;

  return {
    h: props.hsl.h,
    s: saturation,
    v: bright,
    a: props.hsl.a,
    source: 'rgb'
  };
}