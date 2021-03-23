const moduleGameboard = (() => {
    
    let _gameGrid = [];

    // Set gameboard grid when player interacts in DOM
    const setGridElems = () => {

    }

})();

// 
const gameLogic = (() => {
    
    const _playMove = () => {
        alert("Testing object initialization.");
    }

    const initialize = () => {
        document.querySelectorAll('.game-btn').forEach(i => {
            i.addEventListener('click', () => { _playMove() });
        })
    }

    return {
            initialize
           };
})();

gameLogic.initialize();


