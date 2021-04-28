# TicTacToeGame
A web game of TicTacToe using vanilla JS.

## Modules
The game makes use of several Javascript modules to operate. The primary module is gameLogic, while the gameboard module interacts closely with DOM elements.

## Notes on the logic behind the Square Selection Algorithm
The square selection algorithm is what the AI uses to determine where to place its symbol (the circle) on the game grid. It is a relatively simple algorithm that scans for empty rows/columns, or rows/columns only inhabited by the AI's 'O' symbol. Upon determining the state of the grid, the AI will place its marker in the very first free space found that could lead to a victory.

The algorithm consists of 4 functions: scanColumn, scanRow, scanSpecial, and canPlayDiag. Each row is scanned for free spaces to place an AI symbol, the 'O' in tic-tac-toe. These scan functions also will fall back to check whether player symbols are present in a row if the row is not completely free of symbols. If an AI 'O' is detected, then the logic will be to place another 'O' in the first free space. The scan functions will return a single number from 0-8, indicating which cell in the grid the AI should play. If a -1 is returned, then diagonal rows are checked for validity. canPlayDiag also returns a number to play (-1, 0, 2, 4, 6, 8). 

If no valid moves can be found, the main controller assumes the game has concluded and then determines a stalemate or clear victory.

Scanning the top row also includes a special behavior: If the entire row is not free and the player's 'X' symbol is found, then "scanColumn" is called on each of the three cells of the row to determine the state of each cell in the corresponding column. The logic that unfolds is nearly identical to scan row, and will determine if the AI should make a play for a vertical tic-tac-toe instead.

The first and third spaces of the first row also will run another unique function: canPlayDiag. This will only be called if scanRow and scanColumn fail to provide any satisfactory moves for the AI. The flags for this function to run are set as all rows and columns are scanned, building a picture of the state of the two diagonal rows in the grid. If they are determined to be free, or the diagonal rows only contain AI 'X' symbols, then the AI will immediately set another 'X' in the first free space.

scanSpecial is a function that runs at the beginning of the AI's turn to check the state of the last row/column that was played. If this value is not -1, then it will scan the last targeted area again to see if play there is still viable. If not, the scan operations commence as normal.

To add variance, the first square in the grid checked as a free space is picked at random. This action only occurs if the AI does not log a "last square played" variable that will direct it to check that row or column first. The lastSquarePlayed object contains two variables: 'orientation': vertical/horizontal/diagonal, and 'cell': 0-8, which describes the last cell in the grid that it placed its 'O' symbol.

## Pseudo Code for Scan Algorithms

### Scan Row
    Arguments: rowNumber

    > LOOP: [is row empty?]
        > TRUE: set marker at first cell 'n'
        > FALSE: [is No player markers present?]
            > TRUE: set marker at first free cell 'n'
            > FALSE: [are there any free cells?]
                > TRUE: CALL scanColumn - scan corresponding columns for each free cell in row
                > FALSE: Proceed to scan row n+1

### Scan Column
    Arguments: colNumber

    > LOOP: [is column empty?]
        > TRUE: