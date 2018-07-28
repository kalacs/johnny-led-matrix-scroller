const Raspi = require('raspi-io');
const five = require('johnny-five');
const board = new five.Board({
  io: new Raspi()
});

var chars = five.Led.Matrix.CHARS;

var index = 0;
const drawChar = function(matrix, index, chars) {

	matrix.draw(chars[index]);
	var newIndex = index + 1;
	setTimeout(drawChar.bind(null, matrix, newIndex, chars), 100);
};
const objectValues = function(obj){
	const keys = Object.keys(obj);

	return keys.map(function(property){
		return obj[property];
	});
};
const values = objectValues(chars);
board.on('ready', function() {

  var matrix = new five.Led.Matrix({
    pins: {
      data: 'P1-19',
      clock: 'P1-23',
      cs: 'P1-24'
    }
  });

  matrix.off();
  matrix.on();
  drawChar(matrix, index, values);
});
