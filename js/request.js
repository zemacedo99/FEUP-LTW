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
    // console.log(response);
    // console.log(responseJSON);
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