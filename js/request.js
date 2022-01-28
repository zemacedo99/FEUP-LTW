let server = "http://twserver.alunos.dcc.fc.up.pt:8008/";
var first_play = true;
var multi_player = false;
var winner = null;

async function ranking() {
    let url = server + "ranking";

    let request = fetch(url, {
        method: 'POST',
        body: JSON.stringify({}),
    }
    );

    let response = await request;

    let responseJSON = await response.json();

    //show what i got 
    // console.log(response);
    // console.log(responseJSON);
    showLeaderBoard(responseJSON.ranking);
}


async function register() {
    let nickname = document.getElementById("Nickname").value;
    let psw = document.getElementById("psw").value;

    let options = {
        method: 'POST',
        headers: {
            'Content-Type':
                'application/json;'
        },
        body: JSON.stringify({ nick: nickname, password: psw })
    }
    fetch('http://twserver.alunos.dcc.fc.up.pt:8008/register', options)
        .then((response) => {
            if (response.ok) {
                return response.ok;
            } else {
                throw new Error('Wrong password');
            }
        })
        .catch((error) => {
            alert(error);
        });
}

async function join() {
    let nickname = document.getElementById("Nickname").value;
    let psw = document.getElementById("psw").value;
    let b_size = document.getElementById("number_holes").value;
    let s_initial = document.getElementById("number_seeds").value;

    let options = {
        method: 'POST',
        headers: {
            'Content-Type':
                'application/json;'
        },
        body: JSON.stringify({ group: 111, nick: nickname, password: psw, size: b_size, initial: s_initial })
    }
    let fetchRes = fetch('http://twserver.alunos.dcc.fc.up.pt:8008/join', options)

    fetchRes.then(res =>
        res.json()).then(d => {
            console.log(d.game);
            game.setToken(d.game);
            return d.game;
        })
}

async function update() {
    let nickname = document.getElementById("Nickname").value;
    let gameToken = game.token;
    const url = new URL(server + "update");

    url.searchParams.append('nick', nickname);
    url.searchParams.append('game', gameToken);


    const updateSource = new EventSource(url.href);



    updateSource.onmessage = response => {
        console.log(response.data);
        let info = JSON.parse(response.data);


        if (first_play) {
            if ('turn' in info.board) {
                let turn = info.board.turn;
                if (turn != nickname) {
                    game.board.current_player = 0
                }
                else {
                    game.board.current_player = 1;
                }
                game.board.showPlayerTurn();
                first_play = false;
                multi_player = true;
                //console.log("made first player change")
            }
        }

        if ('board' in info) {
            if ('pit' in info) {
                if (game.board.current_player == 0) {
                    let correct_pit = Math.abs(info.pit - game.num_holes);
                    let hole_to_click = game.board.rows_list[0].holes_list[correct_pit];
                    reap(hole_to_click);
                    move();
                }
            }
            if ('turn' in info.board) {

                let turn = info.board.turn;
                if (turn != nickname) {
                    game.board.current_player = 0;
                }
                else {
                    game.board.current_player = 1;
                }
                game.board.showMultiPlayer();
            }
        }

        if ('winner' in info) {
            if (info.winner == null) {
                winner = null;
            }
            else {
                winner = info.winner;
            }

            game.board.showMultiPlayerWin(winner);
        }

    }

}

async function leave() {
    let nickname = document.getElementById("Nickname").value;
    let psw = document.getElementById("psw").value;

    let options = {
        method: 'POST',
        headers: {
            'Content-Type':
                'application/json;'
        },
        body: JSON.stringify({ nick: nickname, password: psw, game: game.token })
    }
    fetch('http://twserver.alunos.dcc.fc.up.pt:8008/leave', options)
        .then((response) => {
            if (response.ok) {
                console.log(response.json());
                return response;
            } else {
                throw new Error('Not a');
            }
        })
        .catch((error) => {
            console.log(error);
        });
}


async function notify(to_move) {
    let nickname = document.getElementById("Nickname").value;
    let psw = document.getElementById("psw").value;
    let gameToken = game.token;
    if (!multi_player) {
        return;
    }

    let options = {
        method: 'POST',
        headers: {
            'Content-Type':
                'application/json;'
        },
        body: JSON.stringify({ nick: nickname, password: psw, game: gameToken, move: to_move - 1 })
    }
    fetch('http://twserver.alunos.dcc.fc.up.pt:8008/notify', options)
        .then((response) => {
            if (response.ok) {
                return response;
            } else {
                throw new Error('notify error');
            }
        })
        .catch((error) => {
            console.log(error);
        });
}
