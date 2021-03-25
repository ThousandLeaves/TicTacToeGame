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
    }

    const getId = () => _sqId;

    return {
        getSymbol,
        setSymbol,
        getId
    }
};


const gameLogic = (() => {

    const _playMove = (i) => {
        alert(i.classList[1]);
        alert(gameboard.getSquare(0).getId());
    }

    const initialize = () => {

        // Set DOM objects to interact with gameSquare objects
        // Next, push square objects to the gameGrid
        document.querySelectorAll('.game-btn').forEach(i => {
            i.addEventListener('click', () => { _playMove(i) }, false);
            let squareObject = gameSquare(i.classList[1]);
            gameboard.addSquare(squareObject);
        })
    }

    // Note, module functions should be returned as an object
    return {
            initialize
           };
})();

gameLogic.initialize();


