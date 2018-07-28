//const Raspi = require('raspi-io');
//const five = require('johnny-five');
const five = require('./mock/johnny-five');
const MatrixScroller = require('./matrix-scroller');
/*
const board = new five.Board({
	io: new Raspi(),
	repl: false
});

const boardPromise = new Promise((resolve, reject) => {
	board.on('ready', resolve)
	board.on('error', reject)
})
*/
const boardPromise = Promise.resolve();
const chars = five.Led.Matrix.CHARS;
const string = 'Zoli';
const SIZE = 8;

boardPromise
	.then(() => {
		const matrix = new five.Led.Matrix({
			pins: {
				data: 'P1-19',
				clock: 'P1-23',
				cs: 'P1-24'
			}
		});
		const offset = 2;
		const delay = 300;
		matrix.off();
		matrix.on();
		const matrixScroller = new MatrixScroller({ 
			matrix,
			size: SIZE,
			offset,
			delay
		});
		matrixScroller.scroll(string);
	})
