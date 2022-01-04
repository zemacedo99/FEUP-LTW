class Board {
    constructor(id, num_holes, num_seeds,first_player) {
        this.id = id;
        this.num_holes = num_holes;
        this.num_seeds = num_seeds;
        this.current_player = first_player;
        this.rows_list = [];
        this.storages_list = [];
        this.showPlayerTurn();
        this.createBoard();
    }

    createBoard() {
        //create rows
        for (let i = 0; i < 2; i++) {
            let row = new Row(i, this.num_holes, this.num_seeds);
            this.rows_list[i] = row;
        }

        //create storage
        for (let i = 0; i < 2; i++) {
            let storage = new Storage(i);
            this.storages_list[i] = storage;
        }
    }   

    showPlayerTurn()
    {
        let currentPlayer = document.getElementById("currentPlayer");

        currentPlayer.innerHTML = this.current_player;
        if(this.current_player == 0)
        {
            currentPlayer.innerHTML = 2;
        }
    }

    checkPlayer(hole)
    {
        if(this.current_player == hole.row)
        {
            return true;
        }
        return false;
    }

    changePlayer(current_player)
    {
        this.current_player = current_player ? 0 : 1 

        this.showPlayerTurn();
    }

    changeRow(rowIndex)
    {
        rowIndex = rowIndex ? 0 : 1 
        return rowIndex;
    }

    move()
    {
        for (let r = 0; r < 2; r++) {
            let row = this.rows_list[r];

            for (let h = 1; h <= this.num_holes; h++) {

                let hole = row.holes_list[h];
                if (hole.reaping)
                {
                    this.sow(r,h,hole);
                    this.changePlayer(this.current_player);
                }
            }
        }
    }

    sow(rowIndex,holeIndex,hole)
    {   
        let sow_hole_index = holeIndex;
        
        while(hole.harvested_seeds != 0)
        {
            let row = this.rows_list[rowIndex];
            if(rowIndex == 1)
            {
                // console.log(rowIndex)
                [rowIndex,sow_hole_index] = this.sow_to_the_right(row,rowIndex,sow_hole_index,hole);
                // console.log(rowIndex)
            }
            else
            {
                [rowIndex,sow_hole_index] = this.sow_to_the_left(row,rowIndex,sow_hole_index,hole);
            }
        }

        // console.log( hole.harvested_seeds)
        hole.reaping = false;
    }

    sow_to_the_right(row,rowIndex,sow_hole_index,hole)
    {
        while(hole.harvested_seeds != 0)
        {
            sow_hole_index++;

            if(sow_hole_index <= this.num_holes)
            {
                let next_hole = row.holes_list[sow_hole_index];
                next_hole.addSeed();
                hole.harvested_seeds--;
            }
            else
            {
                let storage = this.storages_list[rowIndex];

                //add seed to storage
                this.add_to_stotage(storage);
                hole.harvested_seeds--;
                //change row
                rowIndex = this.changeRow(rowIndex);
                return [rowIndex,sow_hole_index];
            }
        }
        return [rowIndex,sow_hole_index];
    }

    sow_to_the_left(row,rowIndex,sow_hole_index,hole)
    {
        while(hole.harvested_seeds != 0)
        {
            sow_hole_index--;
            if(sow_hole_index > 0)
            {
                let next_hole = row.holes_list[sow_hole_index];
                next_hole.addSeed();
                hole.harvested_seeds--;
            }
            else
            {
                let storage = this.storages_list[rowIndex];
                
                //add seed to storage
                this.add_to_stotage(storage);
                hole.harvested_seeds--;
                //change row
                rowIndex = this.changeRow(rowIndex);
                return [rowIndex,sow_hole_index];
            }   
        }
        return [rowIndex,sow_hole_index];
    }

    add_to_stotage(storage)
    {
        storage.addSeed(); 
        this.check_game_over(storage);
    }

    check_game_over(storage)
    {
        let total_seeds = this.num_holes * this.num_seeds;
        let player_n_seeds = storage.seeds_list.length;


        if(player_n_seeds > total_seeds/2)
        {
            this.finish_game(storage.id);
        }
    }

    finish_game(player_id)
    {
        alert(player_id + " won");
    }
    
}