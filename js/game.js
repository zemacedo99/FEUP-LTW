let game;




var btnNewGame = document.getElementById("btn-newgame");


class Game {
    constructor() {
        this.startGame();
    }

    startGame() {
        this.update_config();
        this.board = new Board("board", this.num_holes, this.num_seeds);
    }

    update_config()
    {
        this.num_holes = document.getElementById("number_holes").value;
        this.num_seeds = document.getElementById("number_seeds").value;
    }

}

window.onload = function () {
    game = new Game();
}


btnNewGame.onclick = function() {
	window.location.reload();
}