const moveMatrix = ( matrix, space, step ) => {
    const [ firstRow, ] = matrix;
    
    if (step === 0) {
        return matrix;
    }
    const doubledMatrix = duplicateMatrix(matrix, space);
    return transformMatrix(doubledMatrix, firstRow.length, step);
}

const duplicateMatrix = function( matrix, space ) { 
    return matrix.map(function(row) {
        const padding = [];
        for (let i = 1; i < space; i++) {
                padding.push(0);
        }

        return row + padding.join('') + row;
    })
};

const transformMatrix = function( matrix, size, step ) { 
    return matrix.map(function(row) {
        return row.slice(step, (size + step));
    });
}

const lpad = (bitString, size) =>  {
    if (bitString.length >= size) {
        return bitString;
    }

    return '00000000'.split('').concat(bitString.split('')).slice(-8).join('')
}
const convertToMatrix = ( string, chars ) => {
    return string
        .split('')
        .reduce((matrix, char) => {
            const charMatrix = char in chars ? chars[char] : [];

            return appendMatrix(matrix, charMatrix);
        }, []);
};
const appendMatrix = ( sum, toAdd ) => {
    if (!toAdd.length) {
        return sum;
    }

    if ( sum.length && toAdd.length !== sum.length ) {
        return sum;
    }

    if (!sum.length) {
        return toAdd;
    }

    return sum.map(( item, index ) => {
        return lpad(item.toString(2),8) + lpad(toAdd[index].toString(2),8);
    });
};
const clipMatrix = (matrix, size) => matrix.map(item => item.slice(0, size));
const toPureMatrix = (matrix) => matrix.map(item => item.split(''));
const rotateMatrix = (matrix) => {
    const size = 8;
    const rotated = [[],[],[],[],[],[],[],[]];

    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            const originalX = y;
            const originalY = ( size - 1 ) - x;
            rotated[x][y] = matrix[originalX][originalY];
        }
    }

    return rotated;
};
const toStringMatrix = (pureMatrix) => pureMatrix.map(item => item.join(''));
      
class MatrixScroller {
    constructor(options) {
        this.matrix = options.matrix;
        this.size = options.size;
        this.offset = options.offset;
        this.delay = options.delay;
        this.defaultStep = 0;
        this.step = this.defaultStep;
    }

    scroll(string) {
        const matrixDriver = this.matrix
        const chars = matrixDriver.constructor.CHARS
        const stripe = convertToMatrix(string, chars);
        const [ firstRow, ] = stripe
        const matrixToShow = 
            toStringMatrix(
//                rotateMatrix(
                    toPureMatrix(
                        clipMatrix(
                            moveMatrix(stripe, 2, this.step),
                            this.size
                        )
//                    )
                )
            );
            matrixDriver.draw(matrixToShow);

        if (this.step > firstRow.length) {
            this.step = this.defaultStep
        }
        this.step += 2

        setTimeout(this.scroll.bind(this, string, chars), this.delay)
    }
}

module.exports = MatrixScroller;
