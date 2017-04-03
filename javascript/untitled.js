var stage3 = document.getElementById('workIcon');
$stage3 = jQuery(stage3);

// create a manager for that element
var manager = new Hammer.Manager(stage3);

// create recognizers
var Pan = new Hammer.Pan();
var Rotate = new Hammer.Rotate();
var Pinch = new Hammer.Pinch();
var Tap = new Hammer.Tap({
  taps: 1
});
var DoubleTap = new Hammer.Tap({
  event: 'doubletap',
  taps: 2
});

// use them together
Rotate.recognizeWith([Pan]);
Pinch.recognizeWith([Rotate, Pan]);

DoubleTap.recognizeWith([Tap]);
Tap.requireFailure([DoubleTap]);

// add the recognizers
manager.add(Pan);
manager.add(DoubleTap);
manager.add(Tap);





manager.on('panmove', function(e) {
  // do something cool
  var dX = deltaX3 + (e.deltaX);
  var dY = deltaY3 + (e.deltaY);
  $.Velocity.hook($stage3, 'translateX', dX + 'px');
  $.Velocity.hook($stage3, 'translateY', dY + 'px');
});
manager.on('panend', function(e) {
  deltaX3 = deltaX3 + e.deltaX;
  deltaY3 = deltaY3 + e.deltaY;
});



var colors = [
  [20, 187, 95],
  [20, 95, 187],
  [187, 95, 20],
  [187, 20, 95],
  [95, 20, 187],
  [95, 187, 20]
];
function mult(a, b) {
  return Math.round(a * b);
}
function makeColor(rgb, adj) {
  adj = adj || 1;
  return 'rgb('+mult(rgb[0], adj)+','+mult(rgb[1], adj)+','+ mult(rgb[2], adj)+')';
}
var currentColorIndex = 0;
manager.on('tap', function(e) {
  currentColorIndex++;
  if (currentColorIndex >= colors.length) {
    currentColorIndex = 0;
  }
  stage3.style.backgroundColor = makeColor(colors[currentColorIndex]);
  stage3.style.borderColor = makeColor(colors[currentColorIndex], 0.85);
});

var isShrunken = false;
manager.on('doubletap', function() {
  console.log('doubletapped');
  var scale = $.Velocity.hook($stage3, 'scale');
  if (isShrunken) {
    $.Velocity.hook($stage3, 'scale', 2 * scale);
  } else {
    $.Velocity.hook($stage3, 'scale', .5 * scale);
  }
  isShrunken = !isShrunken;
});
}