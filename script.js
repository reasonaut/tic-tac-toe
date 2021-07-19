game = {
    matchState: null, // in-progress, null, or victory
    playerTurn: null,
    turnCount: null,
    player1Score: 0,
    player2Score: 0,
    player1ScoreContainer : document.getElementById('playerOne'),
    player2ScoreContainer : document.getElementById('playerTwo'),
    turnCountContainer : document.getElementById('turnCountContainer'),
    gameboardContainer : document.getElementById('gameboard'),
    gameStatusContainer : document.getElementById('playerTurn'),
    gameStartButton : document.getElementById('gameStartButton'),
    renderGameboard: function() {
        this.turnCountContainer.innerText = this.turnCount;
        this.player1ScoreContainer.innerText = this.player1Score;
        this.player2ScoreContainer.innerText = this.player2Score;
        this.gameStartButton.addEventListener('click', this.startMatch.bind(this));
    },
    addToScore: function(player) {
        if (player === "playerX") this.player1Score += 1;
        if (player === "playerO") this.player2Score += 1;
        if (this.player1Score === 3 || this.player2Score === 3){
        this.player1Score > this.player2Score ? this.gameStatusContainer.innerText = 'Congrats Player X!' : this.gameStatusContainer.innerText = 'Congrats Player O!';
        }
    },
    startMatch: function(){
        if (!this.matchState){
            // randomly select starting player
            console.log(this);
            if (Math.floor(Math.random()*2) === 0){
                this.playerTurn = 'X';
                this.gameStatusContainer.innerText = 'Player X has been randomly selected to go first - make a selection'
            } else {
                this.playerTurn = '0';
                this.gameStatusContainer.innerText = 'Player 0 has been randomly selected to go first - make a selection'
            }
        }
        this.turnCount = 1;
        this.matchState = 'in-progress';
        this.gameStartButton.style.display = 'none';
        this.renderGameboard();
    },
    checkForWinCondition: function() {
        var acrossTop = function() {
            if (gameboard.grid[0][0] === 'X' && gameboard.grid[0][1] === 'X' && gameboard.grid[0][2] === 'X') return 'X';
            if (gameboard.grid[0][0] === 'O' && gameboard.grid[0][1] === 'O' && gameboard.grid[0][2] === 'O') return 'O';
            return null;
        };
        var acrossLeftMiddle = function() {
            if (gameboard.grid[1][0] === 'X' && gameboard.grid[1][1] === 'X' && gameboard.grid[1][2] === 'X') return 'X';
            if (gameboard.grid[1][0] === 'O' && gameboard.grid[1][1] === 'O' && gameboard.grid[1][2] === 'O') return 'O';
            return null;
        };
        var acrossBotom = function() {

        };
        var acrossLeft = function() {

        };
        var acrossTopMiddle = function() {

        };
        var acrossRight = function() {

        };
        var topLeftDiagonal = function () {

        };
        var topRightDiagonal = function() {

        };
        if (acrossTop() === 'X' || acrossLeftMiddle() === 'X' || acrossBotom() === 'X' || acrossLeft() === 'X' || acrossTopMiddle() === 'X' 
            || acrossRight() === 'X' || topLeftDiagonal() === 'X' || topRightDiagonal() === 'X') return 'X';
        if (acrossTop() === 'O' || acrossLeftMiddle() === 'O' || acrossBotom() === 'X' || acrossLeft() === 'X' || acrossTopMiddle() === 'X' 
            || acrossRight() === 'X' || topLeftDiagonal() === 'X' || topRightDiagonal() === 'X') return 'O';
    }
};
gameboard = {
    grid: [[],[],[]],
    init: function(){
        this.populateGridNullfunction();
        this.drawGridContents();
        this.addGridEventListeners();
    },
    populateGridNullfunction: function() {
        for (i = 0; i < 3; i++){
            for (j = 0; j < 3; j++){
                this.grid[i].push(null);
            }
        }
    },
    drawGridContents: function() {
        for (i = 0; i < 3; i++){
            for (j = 0; j < 3; j++){
                const gridCellValue = this.grid[i][j];
                const gridCellDisplay = document.getElementById(`gridItem${i}-${j}`);
                if (gridCellValue === 'X'){
                    // set background to X image
                    gridCellDisplay.innerText = 'X';

                } else if (gridCellValue === 'O'){
                    // set background to O image
                    gridCellDisplay.innerText = 'O';
                } else {
                    // leave cell empty
                }
            }
        }
        if (game.turnCount){
            game.turnCountContainer.innerText = game.turnCount;
        }
        // check for win condition or turn 10
        const wins = game.checkForWinCondition();
        if (wins) {
            if (wins === 'X') game.matchState = 'X victory';
            if (wins === 'O') game.matchState = 'O victory';
            console.log(game.matchState);


        }
    },
    addGridEventListeners: function() {
        for (i = 0; i < 3; i++){
            for (j = 0; j < 3; j++){
                const gridCellValue = this.grid[i][j];
                const gridCellDisplay = document.getElementById(`gridItem${i}-${j}`);
                gridCellDisplay.addEventListener('click', this.addPlayerSelection.bind(this));
            }
        }
    },
    addPlayerSelection: function(event) {
        cellId = event.target.id.slice(8, 11);
        cellValue = this.grid[cellId[0]][cellId[2]];
        if (!cellValue) {
            cellValue = game.playerTurn;
            // increment turn count
            game.turnCount++;
            if (game.playerTurn === 'X'){
                this.grid[cellId[0]][cellId[2]] = 'X';
                game.playerTurn = 'O';
                game.gameStatusContainer.innerText = 'Player O\'s turn';
            }
            else {
                this.grid[cellId[0]][cellId[2]] = 'O';
                game.playerTurn = 'X'
                game.gameStatusContainer.innerText = 'Player X\'s turn';
            }
        }
        this.drawGridContents();
    },
};

gameboard.init();
gameboard.drawGridContents();
game.renderGameboard();
