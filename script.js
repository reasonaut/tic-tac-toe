game = {
    playerTurn: null,
    player1Score: 0,
    player2Score: 0,
    player1ScoreContainer : document.getElementById('playerOne'),
    player2ScoreContainer : document.getElementById('playerTwo'),
    gameboardContainer : document.getElementById('gameboard'),
    gameStatusContainer : document.getElementById('playerTurn'),
    renderGameboard: function(){
        this.player1ScoreContainer.innerText = this.player1Score;
        this.player2ScoreContainer.innerText = this.player2Score;
    },
    addToScore: function(player){
        if (player === "player1") this.player1Score += 1;
        if (player === "player2") this.player2Score += 1;
        if (this.player1Score === 3 || this.player2Score === 3){
        this.player1Score > this.player2Score ? this.gameStatusContainer.innerText = 'Congrats Player 1!' : this.gameStatusContainer.innerText = 'Congrats Player 2!';
        }
    }
};
gameboard = {
    grid: [[],[],[]],
    init: function(){
        this.populateGridNullfunction();
        this.drawGridContents();
    },
    populateGridNullfunction: function(){
        for (i = 0; i < 3; i++){
            for (j = 0; j < 3; j++){
                this.grid[i].push(null);
            }
        }
    },
    drawGridContents: function (){
        for (i = 0; i < 3; i++){
            for (j = 0; j < 3; j++){
                const gridCellValue = this.grid[i][j];
                const gridCellDisplay = document.getElementById(`gridItem${i}-${j}`);
                gridCellDisplay.addEventListener('click', this.addPlayerSelection);
                if (gridCellValue === 'X'){
                    // set background to X image
                    gridCellDisplay.innerText = 'X';

                } else if (gridCellValue === 'Y'){
                    // set background to Y image
                } else {
                    // leave cell empty
                }
            }
        }
    },
    addPlayerSelection(event){
        console.log(event);

    }
};

gameboard.init();
gameboard.grid[1][1] = 'X';
game.addToScore("player1");
game.addToScore("player1");
game.addToScore("player1");
gameboard.drawGridContents();
game.renderGameboard();
