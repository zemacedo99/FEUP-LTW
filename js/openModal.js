
var rulesModal = document.getElementById("myrulesModal");
var configModal = document.getElementById("myConfigModal");
var leaderBordModal = document.getElementById("myLeaderBordModal");

var btnRules = document.getElementById("btnRules");
var btnConfig = document.getElementById("btnConfig");
var btnLeaderBord = document.getElementById("btnLeaderBord");

var closerules = document.getElementById("closeRules");
var closeConfig = document.getElementById("closeConfig");
var closeLeaderBoard = document.getElementById("closeLeaderBoard");

btnRules.onclick = function() {
    if(rulesModal.style.display == "flex")
    {
        rulesModal.style.display = "none"
    }
    else
    {
        rulesModal.style.display = "flex"
    }
}

btnConfig.onclick = function() {
    if(configModal.style.display == "flex")
    {
        configModal.style.display = "none"
    }
    else
    {
        configModal.style.display = "flex"
    }
}

btnLeaderBord.onclick = function() {
    if(leaderBordModal.style.display == "flex")
    {
        leaderBordModal.style.display = "none"
    }
    else
    {
        leaderBordModal.style.display = "flex"
    }
}


closerules.onclick = function() {
    rulesModal.style.display = "none";
}

closeConfig.onclick = function() {
    configModal.style.display = "none";
}

closeLeaderBoard.onclick = function() {
    leaderBordModal.style.display = "none";
}

// When the user clicks anywhere outside, close it
window.onclick = function(event) {
    if (event.target == rulesModal)
    {
        rulesModal.style.display = "none";
    }
    if (event.target == configModal) 
    {
        configModal.style.display = "none";
    }
    if (event.target == leaderBordModal) 
    {
        leaderBordModal.style.display = "none";
    }
}