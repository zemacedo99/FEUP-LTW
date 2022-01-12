let server = "http://twserver.alunos.dcc.fc.up.pt:8008/";

async function request(type,method,body) {
    let url = "http://twserver.alunos.dcc.fc.up.pt:8008/" + type;

    let request = fetch(url, {
        method: method,
        body: JSON.stringify({body}), //the body of the message is empty, newline
    }
    );

    let response = await request;
    let responseJSON = await response.json();

    return responseJSON;
}


async function register() {
    let url = "http://twserver.alunos.dcc.fc.up.pt:8008/register";

    let request = fetch(url, {
        method: method,
        body: JSON.stringify("nick: EWGR, password: another"), //the body of the message is empty, newline
    }
    );

    let response = await request;
    let responseJSON = await response.json();

    console.log(response);
    console.log(responseJSON);

}


async function ranking() {

    let responseJSON = await request( 'ranking','POST','');

    showLeaderBoard(responseJSON.ranking);
}

function showLeaderBoard(rankings)
{
    let tbodyRef = document.getElementById('leaderBoard').getElementsByTagName('tbody')[0];
    let newRow = tbodyRef.insertRow();

    // console.log(rankings)
    for(i = 0; i < rankings.length; i++)
    {        
        let nick = newRow.insertCell(0);
        let games = newRow.insertCell(1);
        let victories = newRow.insertCell(2);
        nick.innerHTML = rankings[i].nick;
        games.innerHTML = rankings[i].games;
        victories.innerHTML = rankings[i].victories;
        newRow = tbodyRef.insertRow();
    }
}

async function register() 
{
    let nickname = document.getElementById("Nickname").value;
    let password = document.getElementById("psw").value;
    console.log(nickname)
    console.log(password)
}
