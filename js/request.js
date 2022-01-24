let server = "http://twserver.alunos.dcc.fc.up.pt:8008/";

async function ranking() {
    let url = server + "ranking";

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
    // console.log(response);
    // console.log(responseJSON);
    showLeaderBoard(responseJSON.ranking);
}


function showLeaderBoard(rankings) {
    let tbodyRef = document.getElementById('leaderBoard').getElementsByTagName('tbody')[0];
    let newRow = tbodyRef.insertRow();

    // console.log(rankings)
    for (i = 0; i < rankings.length; i++) {
        let nick = newRow.insertCell(0);
        let games = newRow.insertCell(1);
        let victories = newRow.insertCell(2);
        nick.innerHTML = rankings[i].nick;
        games.innerHTML = rankings[i].games;
        victories.innerHTML = rankings[i].victories;
        newRow = tbodyRef.insertRow();
    }
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

        if (info.board.turn != undefined) {
            console.log(info.board.turn);
        }

        if (info.pit != undefined) {
            console.log(info.pit);
            //  let hole_to_click = game.board.rows_list[0].holes_list[info.pit];
            // console.log("hole clicked by player ");
            // console.log(hole_to_click);
            // reap(hole_to_click);
            // move();
        }



        // let hole_to_click = this.rows_list[0].holes_list[info.pit];



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
        body: JSON.stringify({ nick: nickname, password: psw, game: "8e3046b4af11634aca6d04b278fadcde" })
    }
    fetch('http://twserver.alunos.dcc.fc.up.pt:8008/leave', options)
        .then((response) => {
            if (response.ok) {
                console.log("leaved");
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
    console.log("hole number " + to_move);

    let options = {
        method: 'POST',
        headers: {
            'Content-Type':
                'application/json;'
        },
        body: JSON.stringify({ nick: nickname, password: psw, game: gameToken, move: to_move })
    }
    fetch('http://twserver.alunos.dcc.fc.up.pt:8008/notify', options)
        .then((response) => {
            if (response.ok) {
                console.log(response.json());
                return response;
            } else {
                throw new Error('notify error');
            }
        })
        .catch((error) => {
            console.log(error);
        });
}
