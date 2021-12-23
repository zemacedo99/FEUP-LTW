let game;

class Game {
    constructor(num_holes, num_seeds) {
        this.num_holes = num_holes;
        this.num_seeds = num_seeds;
        this.startGame();
    }

    startGame() {
        this.board = new Board("board", this.num_holes, this.num_seeds);
    }
}

window.onload = function () {
    game = new Game(10, 5);
}