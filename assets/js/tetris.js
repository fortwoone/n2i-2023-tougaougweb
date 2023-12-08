// https://tetris.fandom.com/wiki/Tetris_Guideline

// get a random integer between the range of [min,max]
// @see https://stackoverflow.com/a/1527820/2124254
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// generate a new tetromino sequence
// @see https://tetris.fandom.com/wiki/Random_Generator
function generateSequence() {
    const sequence = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];

    while (sequence.length) {
        const rand = getRandomInt(0, sequence.length - 1);
        const name = sequence.splice(rand, 1)[0];
        tetrominoSequence.push(name);
    }
}

// get the next tetromino in the sequence
function getNextTetromino() {
    if (tetrominoSequence.length === 0) {
        generateSequence();
    }

    const name = tetrominoSequence.pop();
    const matrix = tetrominos[name];

    // I and O start centered, all others start in left-middle
    const col = playfield[0].length / 2 - Math.ceil(matrix[0].length / 2);

    // I starts on row 21 (-1), all others start on row 22 (-2)
    const row = name === 'I' ? -1 : -2;

    return {
        name: name,      // name of the piece (L, O, etc.)
        matrix: matrix,  // the current rotation matrix
        row: row,        // current row (starts offscreen)
        col: col         // current col
    };
}

// rotate an NxN matrix 90deg
// @see https://codereview.stackexchange.com/a/186834
function rotate(matrix) {
    const N = matrix.length - 1;
    const result = matrix.map((row, i) =>
        row.map((val, j) => matrix[N - j][i])
    );

    return result;
}

// check to see if the new matrix/row/col is valid
function isValidMove(matrix, cellRow, cellCol) {
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] && (
                // outside the game bounds
                cellCol + col < 0 ||
                cellCol + col >= playfield[0].length ||
                cellRow + row >= playfield.length ||
                // collides with another piece
                playfield[cellRow + row][cellCol + col])
            ) {
                return false;
            }
        }
    }

    return true;
}

// Points awarded based on how many lines were cleared in one placement.
// See https://tetris.wiki/Scoring/Original_Nintendo_scoring_system for more details.
// (currently, there is no such thing as a level, so the points don't increase)
const SCORE_VALUES = [
    40, // One line
    100, // Two lines
    300, // Three lines
    1200 // Four lines or more
]

const LEVEL_RHYTHM_DELAYS = [
    403, // Normal speed
    268, // 1.5x speed
    201, // 2x speed
    134, // 3x speed
]

let level = 1; // Current level

function advance_one_level(){
    for (let row = -2; row < 20; row++) {
        playfield[row] = [];

        for (let col = 0; col < 10; col++) {
            playfield[row][col] = 0;
        }
    }
    tetromino = getNextTetromino();

    switch (level){
        case 1:
            tetris.pause();
            break;
        case 2:
            tetris2.pause();
            break;
        case 3:
            tetris3.pause();
            break;
        case 4:
            tetris4.pause();
            break;
    }
    level++;
    actual_level++;
    if (level > 4){
        level = 1;
    }
    switch (level){
        case 1:
            tetris.play().then(x => console.log("Playing OST"));
            break;
        case 2:
            tetris2.play().then(x => console.log("Playing OST"));
            break;
        case 3:
            tetris3.play().then(x => console.log("Playing OST"));
            break;
        case 4:
            tetris4.play().then(x => console.log("Playing OST"));
            break;
    }
}

// place the tetromino on the playfield
function placeTetromino() {
    for (let row = 0; row < tetromino.matrix.length; row++) {
        for (let col = 0; col < tetromino.matrix[row].length; col++) {
            if (tetromino.matrix[row][col]) {

                // game over if piece has any part offscreen
                if (tetromino.row + row < 0) {
                    return showGameOver();
                }

                playfield[tetromino.row + row][tetromino.col + col] = tetromino.name;
            }
        }
    }

    let clears = 0; // Number of row clears with the tetromino

    // check for line clears starting from the bottom and working our way up
    for (let row = playfield.length - 1; row >= 0; ) {
        if (playfield[row].every(cell => !!cell)) {
            clears++;
            lines_cleared++;
            cleared_until_level++; // Increment that to increase the level every 10 lines
            // drop every row above this one
            for (let r = row; r >= 0; r--) {
                for (let c = 0; c < playfield[r].length; c++) {
                    playfield[r][c] = playfield[r-1][c];
                }
            }
        }
        else {
            row--;
        }
    }

    tetromino = getNextTetromino();

    if (cleared_until_level >= 10){
        cleared_until_level %= 10;
        advance_one_level();
    }

    if (!!clears){
        return SCORE_VALUES[clears - 1];
    }
    return 0;
}

// show the game over screen
function showGameOver() {
    cancelAnimationFrame(rAF);
    gameOver = true;

    context.fillStyle = 'black';
    context.globalAlpha = 0.75;
    context.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);

    context.globalAlpha = 1;
    context.fillStyle = 'white';
    context.font = '36px monospace';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2);
    return 0; // Doing that to ensure we're not jipping the score display
}

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const grid = 32;
const tetrominoSequence = [];
// const rhythm = new Audio('assets/sound/click.mp3');
// rhythm.preload = "auto";
const tetris = new Audio("assets/sound/nooff.mp3");
tetris.preload = "auto";
tetris.loop = true;
const tetris2 = new Audio("assets/sound/level2.mp3");
tetris2.preload = "auto";
tetris2.loop = true;
const tetris3 = new Audio("assets/sound/level3.mp3");
tetris3.preload = "auto";
tetris3.loop = true;
const tetris4 = new Audio("assets/sound/level4.mp3");
tetris4.preload = "auto";
tetris4.loop = true;

// keep track of what is in every cell of the game using a 2d array
// tetris playfield is 10x20, with a few rows offscreen
const playfield = [];

// populate the empty state
for (let row = -2; row < 20; row++) {
    playfield[row] = [];

    for (let col = 0; col < 10; col++) {
        playfield[row][col] = 0;
    }
}

// how to draw each tetromino
// @see https://tetris.fandom.com/wiki/SRS
const tetrominos = {
    'I': [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]
    ],
    'J': [
        [1,0,0],
        [1,1,1],
        [0,0,0],
    ],
    'L': [
        [0,0,1],
        [1,1,1],
        [0,0,0],
    ],
    'O': [
        [1,1],
        [1,1],
    ],
    'S': [
        [0,1,1],
        [1,1,0],
        [0,0,0],
    ],
    'Z': [
        [1,1,0],
        [0,1,1],
        [0,0,0],
    ],
    'T': [
        [0,1,0],
        [1,1,1],
        [0,0,0],
    ]
};

// color of each tetromino
const colors = {
    'I': 'cyan',
    'O': 'yellow',
    'T': 'purple',
    'S': 'green',
    'Z': 'red',
    'J': 'blue',
    'L': 'orange'
};

let count = 0;
let score = 0;
let cleared_until_level = 0;
let lines_cleared = 0;
let actual_level = 0;
let tetromino = getNextTetromino();
let rAF = null;  // keep track of the animation frame so we can cancel it
let gameOver = false;
down = false;



// Pad an object from the left using another string.
function pad(pad, str) {
    if (typeof str === 'undefined')
        return pad;
    return (pad + str).slice(-pad.length);
}

let prevTime = new Date().getTime();

function update_score(){
    document.getElementById("score_display").innerHTML = pad("000000", score);
    document.getElementById("line_count").innerHTML = pad("", lines_cleared);
    document.getElementById("level_no").innerHTML = pad("", actual_level);
}

// game loop
function loop() {
    rAF = requestAnimationFrame(loop);
    update_score();
    context.clearRect(0,0,canvas.width,canvas.height);

    // draw the playfield
    for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 10; col++) {
            if (playfield[row][col]) {
                const name = playfield[row][col];
                context.fillStyle = colors[name];

                // drawing 1 px smaller than the grid creates a grid effect
                context.fillRect(col * grid, row * grid, grid-1, grid-1);
            }
        }
    }

    // draw the active tetromino
    if (tetromino) {
        if (down) {
            for (i = tetromino.row; i < 20; i++){
                console.log("down");
                if (!isValidMove(tetromino.matrix, i, tetromino.col)) {
                    tetromino.row = i-1;
                    score += placeTetromino();
                    break;
                }
            }
            down = false;

            tetromino.row++;
        }

        // tetromino falls every 35 frames
        // get the timestamp
        var time = new Date().getTime();
        // if time passed since prevTime is greater than 35ms
        if (time - prevTime > LEVEL_RHYTHM_DELAYS[level-1]) {
            prevTime = time;
            // rhythm.play().then(x => console.log("Play"));
            tetromino.row++;
            count = 0;

            // place piece if it runs into anything
            if (!isValidMove(tetromino.matrix, tetromino.row, tetromino.col)) {
                tetromino.row--;
                score += placeTetromino();
            }
        }

        context.fillStyle = colors[tetromino.name];

        for (let row = 0; row < tetromino.matrix.length; row++) {
            for (let col = 0; col < tetromino.matrix[row].length; col++) {
                if (tetromino.matrix[row][col]) {

                    // drawing 1 px smaller than the grid creates a grid effect
                    context.fillRect((tetromino.col + col) * grid, (tetromino.row + row) * grid, grid-1, grid-1);
                }
            }
        }
    }
}


// listen to keyboard events to move the active tetromino
document.addEventListener('keydown', function(e) {
    if (gameOver) return;

    // left and right arrow keys (move)
    if (e.which === 37 || e.which === 39) {
        const col = e.which === 37
            ? tetromino.col - 1
            : tetromino.col + 1;

        if (isValidMove(tetromino.matrix, tetromino.row, col)) {
            tetromino.col = col;
        }
    }

    // up arrow key (rotate)
    if (e.which === 38) { // if not synced with the music, the player can't turn the piece
        const matrix = rotate(tetromino.matrix);
        if (isValidMove(matrix, tetromino.row, tetromino.col)) {
            tetromino.matrix = matrix;
        }
    }

    // down arrow key (drop)
    if(e.which === 40) {
        const row = tetromino.row + 1;
        down = true;

        for (i = row; i > 0; i--){
            console.log("down");
            if (!isValidMove(tetromino.matrix, i, tetromino.col)) {
                tetromino.row = i-1;
                score += placeTetromino();
            }
        }
        if (!isValidMove(tetromino.matrix, row, tetromino.col)) {
            tetromino.row = row - 1;
//
            score += placeTetromino();
            return;
        }

        tetromino.row = row;
    }
});

document.addEventListener('keyup', function(e) {
    if (e.which === 40) {
        down = false;
    }
});

function reset(){

    // populate the empty state
    for (let row = -2; row < 20; row++) {
        playfield[row] = [];

        for (let col = 0; col < 10; col++) {
            playfield[row][col] = 0;
        }
    }

    tetromino = getNextTetromino();

    rAF = requestAnimationFrame(loop);
    score = 0;
    // TODO : augmenter la vitesse et le rythme au fil du jeu
    tetris.play().then(x => console.log("Playing the OST"));
    console.log("play");
    gameOver = false;

}

// start the game
//rAF = requestAnimationFrame(loop);