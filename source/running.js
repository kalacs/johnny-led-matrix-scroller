const Raspi = require('raspi-io');
const five = require('johnny-five');
const board = new five.Board({
  io: new Raspi()
});
var moveMatrix = (matrix, space, step) => {
  var firstRow = matrix[0];

  if (step === 0) {
    return matrix;
  }
  var doubledMatrix = duplicateMatrix(matrix, space);
  return transformMatrix(doubledMatrix, firstRow.length, step);
}

var duplicateMatrix = function(matrix, space) { 
	return matrix.map(function(row) {
		var padding = [];
  	for (var i = 1; i < space; i++) {
    		padding.push(0);
  	}

	return row + padding.join('') + row;
	})
};

var transformMatrix = function(matrix, size, step) { 
	return matrix.map(function(row) {
		return row.slice(step, (size + step));
	});
}
const DEFAULT_STEP = 0;
var step = DEFAULT_STEP;
var chars = five.Led.Matrix.CHARS;

var index = 0;
const drawChar = function(matrix, index, chars) {

	matrix.draw(chars[index]);
	var newIndex = index + 1;
	setTimeout(drawChar.bind(null, matrix, newIndex, chars), 500);
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


/*  var heart = [
    "01100110010000001",
    "11111111011000011",
    "11111111010100101",
    "11111111010011001",
    "01111110010000001",
    "00111100010000001",
    "00011000010000001",
    "00000000010000001"
  ];
*/

var heart = [
"1000001011111110100000001000000000111000",
"1000001010000000100000001000000001000100",
"1000001010000000100000001000000010000010",
"1111111011111110100000001000000010000010",
"1111111011111110100000001000000010000010",
"1000001010000000100000001000000010000010",
"1000001010000000100000001000000001000100",
"1000001011111110111111101111111000111000",
];

matrix.off();
matrix.on();
 var firstRow = heart[0];

/*setInterval(function(){
  matrix.draw(moveMatrix(heart, 2, step));
//  matrix.draw(heart);
//  matrix.clear();

  if (step > firstRow.length) {
    step = DEFAULT_STEP;
  }
step+=4;
}, 5)
*/

  drawChar(matrix, index, values);

  this.repl.inject({
    chars: chars,
    matrix: matrix
  });

});
