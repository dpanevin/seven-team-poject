import { Spinner } from 'spin.js';

// настройки спиннера потом откорректируем
var opts = {
  lines: 20, // The number of lines to draw
  length: 25, // The length of each line
  width: 10, // The line thickness
  radius: 20, // The radius of the inner circle
  scale: 0.5, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  speed: 1, // Rounds per second
  rotate: 0, // The rotation offset
  animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#ff6b08', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  top: '60px', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  zIndex: 2000000000, // The z-index (defaults to 2e9)
  className: 'spinner', // The CSS class to assign to the spinner
  position: 'absolute', // Element positioning
};

var target = document.getElementById('spinner');
var spinner = new Spinner(opts);

function addSpinner() {
  return spinner.spin(target);
}

function stopSpinner() {
  return spinner.stop();
}

export { addSpinner, stopSpinner };
