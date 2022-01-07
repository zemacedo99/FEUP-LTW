let game;




var btnNewGame = document.getElementById("btn-newgame");


class Game {
    constructor() {
        this.startGame();
    }

    startGame() {
        this.update_config();
        this.board = new Board("board", this.num_holes, this.num_seeds, this.first_player);
    }

    update_config() {
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
}

function checkPlayer(hole) {
    return game.board.checkPlayer(hole);
}


async function ranking() {
    let url = "http://twserver.alunos.dcc.fc.up.pt:8008/ranking";

    let request = fetch(url, {
        method: 'POST',
        body: JSON.stringify({}), //the body of the message is empty, newline
    }
    );

    //if it was ok
    let response = await request;

    //the info that i wanted (in this case the leaderboard)
    let responseJSON = await response.json();

    //show what i got 
    console.log(response);
    console.log(responseJSON);
}