let game;
let btnNewGame = document.getElementById("btn-newgame");
let btnMultiplayer = document.getElementById("btn-multiplayer");
let btnNewGameAi = document.getElementById("btn-newgameai");
let btnRegister = document.getElementById("btn-register");
let btnLeave = document.getElementById("btn-quit");

class Game {
    constructor() {
        this.startGame();
    }

    setToken(token) {
        this.token = token;
        update();
    }

    startGame() {
        this.update_config();
        this.board = new Board("board", this.num_holes, this.num_seeds, this.first_player, this.pc_mode, this.ai_level);
    }

    update_config() {
        this.ai_level = document.getElementById("lvl").value;
        this.num_holes = document.getElementById("number_holes").value;
        this.num_seeds = document.getElementById("number_seeds").value;
        this.pc_mode = document.getElementById("pc_mode").checked;
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

btnMultiplayer.onclick = function () {
    join();
}

btnLeave.onclick = function () {
    leave();
}


btnRegister.onclick = function () {
    let response = register();

    console.log(response)
    if (response) {
        console.log("here")
        let nickname = document.getElementById("Nickname").value;

        document.getElementById("without_login").style.display = "none";
        document.getElementById("with_login").style.display = "block";
        document.getElementById("with_login1").style.display = "block";
        let name = document.getElementById('nick_name');
        name.innerHTML = '<p>' + nickname + '</p>';

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
    game.board.move();
    game.board.aiplay();
}

function checkPlayer(hole) {
    return game.board.checkPlayer(hole);
}
