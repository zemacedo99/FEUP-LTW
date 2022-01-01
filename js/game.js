let game;




var btnNewGame = document.getElementById("btn-newgame");


class Game {
    constructor() {
        this.startGame();
        this.check_game_over(); // needs to be exectute this all the time
    }

    startGame() {
        this.update_config();
        this.board = new Board("board", this.num_holes, this.num_seeds);
    }

    update_config()
    {
        this.num_holes = document.getElementById("number_holes").value;
        this.num_seeds = document.getElementById("number_seeds").value;
    }

    check_game_over()
    {
        let total_seeds = this.num_holes * this.num_seeds;
        
        for( let index in this.board.storages_list)
        {
            let storage = this.board.storages_list[index];
            let player_n_seeds = storage.seeds_list.length;

            if(player_n_seeds > total_seeds/2)
            {
                finish_game(this.storage.id);
            }
        }
    }

    finish_game(player_id)
    {
        alert(player_id);
        alert("won");
    }
}

window.onload = function () {
    game = new Game();
}


btnNewGame.onclick = function() {
	window.location.reload();
}