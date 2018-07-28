const Raspi = require('raspi-io');
const five = require('johnny-five');
const board = new five.Board({
  io: new Raspi()
});

const DEFAULT_STEP = 0;
var step = DEFAULT_STEP;
var chars = five.Led.Matrix.CHARS;

const lpad = (bitString, size) =>  {
	if (bitString.length >= size) {
		return bitString;
	}

	return '00000000'.split('').concat(bitString.split('')).slice(-8).join('')
}
const convertToMatrix = (string) => {
	return string
		.split('')
		.reduce((matrix, char) => {
			const charMatrix = chars.hasOwnProperty(char) ? chars[char] : [];

			return appendMatrix(matrix, charMatrix);
		}, []);
};
const appendMatrix = (sum, toAdd) => {
	if (!toAdd.length) {
		return sum;
	}

	if (sum.length && toAdd.length !== sum.length) {
		return sum;
	}

	if (!sum.length) {
		return toAdd;
	}

	return  sum.map((item, index) => {
		return lpad(item.toString(2),8) + lpad(toAdd[index].toString(2),8);
	});
};

board.on('ready', function() {

  var matrix = new five.Led.Matrix({
    pins: {
      data: 'P1-19',
      clock: 'P1-23',
      cs: 'P1-24'
    }
  });

  const string = 'Hello World';
  const stringMatrix = convertToMatrix(string);
console.log(stringMatrix);
  this.repl.inject({
    chars: chars,
    matrix: matrix
  });

});
