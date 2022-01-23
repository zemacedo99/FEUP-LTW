let server = "http://twserver.alunos.dcc.fc.up.pt:8008/";

async function request(type, method, body) {
    let url = "http://twserver.alunos.dcc.fc.up.pt:8008/" + type;

    let request = fetch(url, {
        method: method,
        body: JSON.stringify(body), //the body of the message is empty, newline
    }
    );

    let response = await request;
    let responseJSON = await response.json();

    console.log(response.statusText)
    return responseJSON;
}

async function ranking() {

    let responseJSON = await request('ranking', 'POST', '');

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
    console.log(nickname)
    console.log(psw)

    let body = {
        nick: nickname,
        password: psw
    }
    let responseJSON = await request('register', 'POST', body);

    console.log(responseJSON);

}


//fetch(url, {
 //   method: 'POST',
  //  headers: {
  //      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
   // },
   // body: 'de=zp&para'
//})
 //   .then(response => response.json())
 //   .then(process)
  //  .catch(console.log);
