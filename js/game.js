let game;
let btnNewGame = document.getElementById("btn-newgame");
let btnNewGameAi = document.getElementById("btn-newgameai");
let btnRegister = document.getElementById("btn-register");

class Game {
    constructor() {
        this.startGame();
    }

    startGame() {
        this.update_config();
        this.board = new Board("board", this.num_holes, this.num_seeds, this.first_player);
    }

    update_config() {
        this.ai_level = document.getElementById("lvl").value;
        this.num_holes = document.getElementById("number_holes").value;
        this.num_seeds = document.getElementById("number_seeds").value;
        this.first_player = document.querySelector('input[name="chooseplayerRadio"]:checked').value;
    }
}

window.onload = function () {
    ranking();
    game = new Game();
}


btnNewGame.onclick = function () {
    newGame();
}

btnRegister.onclick = function () {
    let response = register();

    if (response == "OK") {
        console.log("it was ok")
    }

}

function newGame() {
    // window.location.reload();
    let rows = document.getElementById("rows");
    let storage0 = document.getElementById("hole00");
    let storage1 = document.getElementById("hole10");
    rows.innerHTML = '';
    storage0.innerHTML = '';
    storage1.innerHTML = '';
    game.startGame();
}


function move() {
    alert(aiPlay(game.ai_level, game.board.rows_list[0]) + " is the suggestion from ai for row 0");
    game.board.move();
}

function checkPlayer(hole) {
    return game.board.checkPlayer(hole);
}
