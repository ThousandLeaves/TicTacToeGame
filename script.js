const gameboard = (() => {
    
    let _gameGrid = [];
    let _gridSize = 9;

    // Set gameboard grid when player interacts in DOM
    const setGridElems = () => {

    }

    const addSquare = (square) => {
        _gameGrid.push(square)
    }

    const getGridSize = () => _gridSize;

    const getSquare = (id) => _gameGrid[id];

    return {
        addSquare,
        getGridSize,
        getSquare
    }

})();

// GameSquare object, 9 total pushed to Gameboard
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

const AIaction = (() => {
    const playTurn = () => {

    }

    return {
        playTurn
    };
})();

const gameLogic = (() => {

    let _playerTurn = true;
    // Default is X
    let _playerSym = "X";

    const _playMove = (i) => {
        console.log(getPlayerTurn());
        if (getPlayerTurn() === true) {
            gameboard.getSquare(i.classList[1]).setSymbol(getSymbol());
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
            getPlayerTurn
           };
})();

gameLogic.initialize();


