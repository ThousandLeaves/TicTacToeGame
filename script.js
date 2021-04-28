// ============================================================================
// [ ] MODULE: gameboard
// ----------------------------------------------------------------------------
const gameboard = (() => {
    
    let _gameGrid = [];
    let _xGrid = [];
    let _oGrid = [];
    const MASTER_GRID_SIZE = 9
    let _xGridSize = MASTER_GRID_SIZE;
    let _oGridSize = MASTER_GRID_SIZE;
    let _gridSize = MASTER_GRID_SIZE;
    let _solutions = [
        [0,1,2],[3,4,5],[6,7,8],[0,3,6],
        [1,4,7],[2,5,8],[0,4,8],[2,4,6]
    ]

    // Set gameboard grid when player interacts in DOM
    const setGridElems = () => {

    }

    // Populates the grid array with square objects at start of gasme
    const addSquare = (square) => {
        _gameGrid.push(square)
    }

    // Returns true if an X or O is observed to have 3 in a row
    const analyzeGrid = (sym) => {
            let grid = [];
        if (sym === 'X') {
            let grid = _xGrid;
        } else {
            let grid = _oGrid;
        }

        // Checks gameboard for whether X or O has a winning pattern
        for (i of _solutions) {
            if(grid[i[0]] && grid[i[1]] && grid[i[2]]) {
                // TicTacToe found for specified symbol!
                return true;
            }
        }
        return false;

        // Run through grid and set vals to true if sym and false otherwise
    }

    // Scans specified row to seek whether it is viable for AI to place its 'O' marker
    const scanRow = (row = 0) => {
        // compatibleCellCt must be equal to 3 for a move in current row to be possible
        let compatibleCellCt = 0;
        for (let i = row * 1; i < row + 3; i++) {
            if (_gameGrid[i] !== 'X' ) {
                compatibleCellCt++;
            }
        }
        if (compatibleCellCt === 3) {
            // Call scanFreeSquare
        } else if (row === 0) {
            // Seek columns for free cells if evaluating first row
        }
    }

    /*
    // Returns the next free square
    const scanFreeSquare = (current = 0) => {
        for (i = current; i < MASTER_GRID_SIZE; i++) {
            if (_gameGrid[i].getSymbol() === "") {
                // Space  is free, check if neighboring symbols are free
                if (_gameGrid[i + 1].getSymbol() === "" &&
                _gameGrid[i + 2].getSymbol() === "") {
                    // Do a thing
                } else if (_gameGrid[i + 3].getSymbol() === "" &&
                _gameGrid[i + 6].getSymbol() === "") {
                    // Do another thing vertically
                }
            }
            break;
        }
    }
    */

    // Uh oh, probably should have commented this. What does it do?
    const isInBounds = (num, offset) => {
        if (num + offset <= MASTER_GRID_SIZE) {
            return true;
        } else {
            return false;
        }
    }

    // Sets a square object to hold a specific X or O value
    const setSquare = (id, sym) => {
        _gameGrid[id] = sym;
        console.log(_gameGrid[id]);
        // Log same element into corresponding symbol exclusive grid
        if(sym === 'X') {
            _xGrid[id] = sym;
        } else {
            _oGrid[id] = sym;
        }
    }

    const getGridSize = () => _gridSize;

    const getSquare = (id) => _gameGrid[id];

    return {
        addSquare,
        getGridSize,
        getSquare,
        setSquare,
        analyzeGrid,
        //scanFreeSquare
    }

})();


// ============================================================================
// ( ) FACTORY: gameSquare
// ----------------------------------------------------------------------------
// gameSquare object, 9 total pushed to Gameboard
const gameSquare = (id) => {
    let _sqId = id;
    let _symbol = "";

    // Symbol is whether the square contains an X or O value
    const getSymbol = () => _symbol;
    const setSymbol = (sym) => {
        _symbol = sym;
        _setHTMLText(sym)
    }

    const _setHTMLText = (sym) => {
        let btnTxt = document.createTextNode(sym);
        document.querySelectorAll('.game-btn')[_sqId].appendChild(btnTxt);
    }

    const getId = () => _sqId;

    return {
        getSymbol,
        setSymbol,
        getId
    }
};

// ============================================================================
// [ ] MODULE: AIaction
// ----------------------------------------------------------------------------
// Logic to play opposing shape to player. Runs when player turn === false
const AIaction = (() => {
    const playTurn = () => {
        // Scan grid for free square
        gameboard.scanFreeSquare();
    }

    return {
        playTurn
    };
})();

// ============================================================================
// [ ] MODULE: gameLogic
// ----------------------------------------------------------------------------
const gameLogic = (() => {

    let _playerTurn = true;
    // Default is X
    let _playerSym = "X";

    const _playMove = (i) => {
        console.log(getPlayerTurn());
        if (getPlayerTurn() === true) {
            gameboard.getSquare(i.classList[1]).setSymbol(getSymbol());
            gameboard.setSquare(i.classList[1], getSymbol());
            _toggleTurn();
        }
    }

    const _toggleTurn = () => {
        if (_playerTurn === true) {
            _playerTurn = false;
            // Call AI turn when === false
            AIaction.playTurn();
        } else {
            _playerTurn = true;
        }
    }

    const _pcMove = () => {
        // Contains the logic for the computer player to mark the grid.
    }

    const _pickSymbol = (sym) => {
        _playerSym = sym;
    }

    const getSymbol = () => {
        return _playerSym;
    }

    const getPlayerTurn = () => {
        return _playerTurn;
    }

    const checkForWin = () => {

    }

    const initialize = () => {
        // Set DOM objects to interact with gameSquare objects
        // Next, push square objects to the gameGrid
        document.querySelectorAll('.game-btn').forEach(i => {
            i.addEventListener('click', () => { _playMove(i) }, false);
            let squareObject = gameSquare(i.classList[1]);
            gameboard.addSquare(squareObject);
        })

        oBtn = document.getElementsByClassName('selector o');
        xBtn = document.getElementsByClassName('selector x');

        Array.from(oBtn).forEach(i => {
            i.addEventListener('click', () => { _pickSymbol('O') });
        });
        Array.from(xBtn).forEach(i => {
            i.addEventListener('click', () => { _pickSymbol('X') });
        });

    }

    // Note, module functions should be returned as an object
    return {
            initialize,
            getSymbol,
            getPlayerTurn,
            checkForWin
           };
})();


// ----------------------------------------------------------------------------
gameLogic.initialize();
