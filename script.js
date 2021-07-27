game = {
    matchState: null, // in-progress, null, over, or victory
    playerTurn: null,
    turnCount: null,
    roundState: null,
    player1Score: 0,
    player2Score: 0,
    player1ScoreContainer : document.getElementById('playerOne'),
    player2ScoreContainer : document.getElementById('playerTwo'),
    turnCountContainer : document.getElementById('turnCountContainer'),
    gameboardContainer : document.getElementById('gameboard'),
    gameStatusContainer : document.getElementById('playerTurn'),
    gameStartButton : document.getElementById('gameStartButton'),
    initGameboard: function() {
        this.gameStartButton.addEventListener('click', this.startMatch.bind(this));
    },
    renderScoreboard: function() {
        this.turnCountContainer.innerText = this.turnCount;
        this.player1ScoreContainer.innerText = this.player1Score;
        this.player2ScoreContainer.innerText = this.player2Score;
    },
    addToScore: function(player) {
        if (player === "playerX") this.player1Score += 1;
        if (player === "playerO") this.player2Score += 1;
        if (this.player1Score === 3 || this.player2Score === 3){
            this.endGame();
        }
    },
    endGame: function() {
        this.player1Score > this.player2Score ? this.gameStatusContainer.innerText = 'Congrats Player X! You win!' 
            : this.gameStatusContainer.innerText = 'Congrats Player O! You win!';
        this.matchState = 'over';
        this.renderScoreboard();
        this.gameStartButton.style.display = 'inline';
        this.gameStartButton.innerText = 'New Game?';
    },
    startMatch: function(){
        if (this.matchState === 'over') {
            this.player1Score = 0;
            this.player2Score = 0;
            this.resetRound();
            this.matchState = null;
        }
        if (!this.matchState){
            // randomly select starting player
            if (Math.floor(Math.random()*2) === 0){
                this.playerTurn = 'X';
                this.gameStatusContainer.innerText = 'Player X has been randomly selected to go first - make a selection'
            } else {
                this.playerTurn = '0';
                this.gameStatusContainer.innerText = 'Player 0 has been randomly selected to go first - make a selection'
            }
            this.resetRound();
        }
        if (this.matchState === 'X victory' || this.matchState === 'Y victory') {
            this.resetRound();

        }
        this.matchState = 'in-progress';
        this.gameStartButton.style.display = 'none';
        this.renderScoreboard();        
    },
    handleTurn: function() {
        // increment turn count
        this.turnCount++;
        this.turnCountContainer.innerText = this.turnCount;
        // check for win condition or turn 10
        const wins = this.checkForWinCondition();
        if (wins) {
            if (wins === 'X') this.matchState = 'X victory';
            if (wins === 'O') this.matchState = 'O victory';
        }
        else if (parseInt(this.turnCount) === 10) this.matchState = 'tie';
        this.evaluateMatchState();
    },
    evaluateMatchState: function() {
        if (this.matchState === 'X victory') {
            this.addToScore('playerX');
            if (this.matchState === 'over') return;
            this.gameStatusContainer.innerText = 'Player X wins the round and a point!';
            this.renderScoreboard();
            this.matchState = null;
            this.gameStartButton.style.display = 'inline';
        }
        if (this.matchState === 'O victory') {
            this.addToScore('playerO');
            if (this.matchState === 'over') return;
            this.gameStatusContainer.innerText = 'Player O wins the round and a point!';
            this.renderScoreboard();
            this.matchState = null;
            this.gameStartButton.style.display = 'inline';
        }
        if (this.matchState === 'tie') {
            this.resetRound();
            this.gameStatusContainer.innerText = 'The round is a tie, no points!';
            this.renderScoreboard();
            this.matchState = null;
            this.gameStartButton.style.display = 'inline';
        }
    },
    resetRound: function() {
        this.roundState = null;
        this.turnCount = 1;
        this.renderScoreboard();
        // clear previous round's board        
        gameboard.populateGridWithNull();
        gameboard.drawGridContents();
        this.matchState = 'in-progress';
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
            if (gameboard.grid[2][0] === 'X' && gameboard.grid[2][1] === 'X' && gameboard.grid[2][2] === 'X') return 'X';
            if (gameboard.grid[2][0] === 'O' && gameboard.grid[2][1] === 'O' && gameboard.grid[2][2] === 'O') return 'O';
            return null;
        };
        var acrossLeft = function() {
            if (gameboard.grid[0][0] === 'X' && gameboard.grid[1][0] === 'X' && gameboard.grid[2][0] === 'X') return 'X';
            if (gameboard.grid[0][0] === 'O' && gameboard.grid[1][0] === 'O' && gameboard.grid[2][0] === 'O') return 'O';
            return null;
        };
        var acrossTopMiddle = function() {
            if (gameboard.grid[0][1] === 'X' && gameboard.grid[1][1] === 'X' && gameboard.grid[2][1] === 'X') return 'X';
            if (gameboard.grid[0][1] === 'O' && gameboard.grid[1][1] === 'O' && gameboard.grid[2][1] === 'O') return 'O';
            return null;
        };
        var acrossRight = function() {
            if (gameboard.grid[0][2] === 'X' && gameboard.grid[1][2] === 'X' && gameboard.grid[2][2] === 'X') return 'X';
            if (gameboard.grid[0][2] === 'O' && gameboard.grid[1][2] === 'O' && gameboard.grid[2][2] === 'O') return 'O';
            return null;
        };
        var topLeftDiagonal = function () {
            if (gameboard.grid[0][0] === 'X' && gameboard.grid[1][1] === 'X' && gameboard.grid[2][2] === 'X') return 'X';
            if (gameboard.grid[0][0] === 'O' && gameboard.grid[1][1] === 'O' && gameboard.grid[2][2] === 'O') return 'O';
            return null;
        };
        var topRightDiagonal = function() {
            if (gameboard.grid[0][2] === 'X' && gameboard.grid[1][1] === 'X' && gameboard.grid[2][0] === 'X') return 'X';
            if (gameboard.grid[0][2] === 'O' && gameboard.grid[1][1] === 'O' && gameboard.grid[2][0] === 'O') return 'O';
            return null;
        };
        if (acrossTop() === 'X' || acrossLeftMiddle() === 'X' || acrossBotom() === 'X' || acrossLeft() === 'X' || acrossTopMiddle() === 'X' 
            || acrossRight() === 'X' || topLeftDiagonal() === 'X' || topRightDiagonal() === 'X') return 'X';
        if (acrossTop() === 'O' || acrossLeftMiddle() === 'O' || acrossBotom() === 'O' || acrossLeft() === 'O' || acrossTopMiddle() === 'O' 
            || acrossRight() === 'O' || topLeftDiagonal() === 'O' || topRightDiagonal() === 'O') return 'O';
    }
};
gameboard = {
    grid: [[],[],[]],
    init: function(){
        this.populateGridWithNull();
        this.drawGridContents();
        this.addGridEventListeners();
    },
    populateGridWithNull: function() {
        for (i = 0; i < 3; i++){
            for (j = 0; j < 3; j++){
                this.grid[i][j] = null;
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
                    // gridCellDisplay.innerText = 'X';
                    gridCellDisplay.style.backgroundSize = '100% 100%'
                    gridCellDisplay.style.backgroundImage = 'url("img/letter-x.png")';

                } else if (gridCellValue === 'O'){
                    // set background to O image
                    // gridCellDisplay.innerText = 'O';
                    gridCellDisplay.style.backgroundSize = '100% 100%'
                    gridCellDisplay.style.backgroundImage = 'url("img/letter-o.png")';
                } else {
                    gridCellDisplay.innerText = '';
                }
            }
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
        if (game.matchState === null || game.matchState === 'victory' || game.matchState === 'over') return;
        cellId = event.target.id.slice(8, 11);
        cellValue = this.grid[cellId[0]][cellId[2]];
        if (!cellValue) {
            cellValue = game.playerTurn;
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
        game.handleTurn();
    },
};

gameboard.init();
gameboard.drawGridContents();
game.initGameboard();
game.renderScoreboard();
