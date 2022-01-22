class Board {
    constructor(id, num_holes, num_seeds,first_player,pc_mode) {
        this.id = id;
        this.num_holes = num_holes;
        this.num_seeds = num_seeds;
        this.current_player = first_player;
        this.pc_mode = pc_mode;
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

    showPlayerWin(player)
    {
        let currentPlayer = document.getElementById("currentPlayer");

        currentPlayer.innerHTML = player + " win";
        if(player == 0)
        {
            currentPlayer.innerHTML = 2 + " win";
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

    changePlayer()
    {
        if(this.pc_mode)
        {
            
        }
        else
        {
            let next_player = this.current_player; 

            if(this.current_player == 0)
            {
                next_player = 1;
            }
            if(this.current_player == 1)
            {
                next_player = 0;
            }
            
            this.current_player = next_player;
        }

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
                    this.check_game_over();
                }
            }
        }
    }

    sow(rowIndex,holeIndex,hole)
    {   
        let sow_hole_index = holeIndex;
        
        while(hole.harvested_seeds != 1)
        {
            [rowIndex,sow_hole_index] = this.sow_seed(rowIndex,sow_hole_index,hole);
        }

        //sow the last seed logic
        let playAgain = this.sow_last_seed(rowIndex,sow_hole_index,hole);
        
        if(!playAgain)
        {
            this.changePlayer();
        }
        // console.log( hole.harvested_seeds)
        hole.reaping = false;
    }

    sow_seed(rowIndex,sow_hole_index,hole)
    {
        if(rowIndex == 1)
        {
            [rowIndex,sow_hole_index] = this.sow_to_the_right(rowIndex,sow_hole_index,hole);
        }
        else
        {
            [rowIndex,sow_hole_index] = this.sow_to_the_left(rowIndex,sow_hole_index,hole);
        }

        return [rowIndex,sow_hole_index];
    }

    sow_last_seed(rowIndex,sow_hole_index,hole)
    {
        [rowIndex,sow_hole_index] = this.sow_seed(rowIndex,sow_hole_index,hole);
        let is_storage = sow_hole_index == 0 || sow_hole_index > this.num_holes
        let playAgain = false;

        if(!is_storage)
        {   
            let row = this.rows_list[rowIndex];
            let last_sown_hole = row.holes_list[sow_hole_index];
            
            if(last_sown_hole.row == this.current_player)
            {
                if(last_sown_hole.num_seeds == 1)
                { 
                    let opposite_rowIndex = this.changeRow(last_sown_hole.row)
                    let opposite_row = this.rows_list[opposite_rowIndex];
                    let opposite_hole = opposite_row.holes_list[last_sown_hole.hole];        
                    let storage = this.storages_list[last_sown_hole.row]
                    let not_empty = false;

                    for(let i=0; i < opposite_hole.num_seeds; i++)
                    {
                        storage.addSeed();
                        not_empty = true;
                    }
                    opposite_hole.emptyHole();

                    if(not_empty)
                    {
                        last_sown_hole.emptyHole();
                        storage.addSeed();
                    }

                }
            }
        }
        else
        {

            if(hole.harvested_seeds != 0)
            {
                this.sow_last_seed(rowIndex,sow_hole_index,hole);
            }
            let storageIndex = this.changeRow(rowIndex)
            //if last seed sow ends at the storage of the player
            if(storageIndex == this.current_player)
            {
                playAgain = true;
            }
            else
            {
                playAgain = false; 
            }
        }

        return playAgain
    }

    sow_to_the_right(rowIndex,sow_hole_index,hole)
    {
        let row = this.rows_list[rowIndex];
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
            this.add_to_stotage(hole,storage);
            //change row
            rowIndex = this.changeRow(rowIndex);
            return [rowIndex,sow_hole_index];
        }
        
        
        return [rowIndex,sow_hole_index];
    }

    sow_to_the_left(rowIndex,sow_hole_index,hole)
    {
        let row = this.rows_list[rowIndex];
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
            this.add_to_stotage(hole,storage);
            //change row
            rowIndex = this.changeRow(rowIndex);
            return [rowIndex,sow_hole_index];
        }   
        
        return [rowIndex,sow_hole_index];
    }

    add_to_stotage(hole,storage)
    {
        if(storage.id == hole.row)
        {
            storage.addSeed(); 
            hole.harvested_seeds--;
        }
    }

    check_game_over()
    {
        for (let r = 0; r < 2; r++) {
            let row = this.rows_list[r];

            let count_empty = 0;
            for (let h = 1; h <= this.num_holes; h++) {

                let hole = row.holes_list[h];
                if (hole.num_seeds == 0)
                {
                    count_empty++;
                }
            }

            if(count_empty == this.num_holes)
            {
                this.finish_game(r);
            }
        }
    }

    finish_game(empty_rowIndex)
    {
        let other_rowIndex = this.changeRow(empty_rowIndex)
        let other_row = this.rows_list[other_rowIndex];
        let other_storage = this.storages_list[other_rowIndex]
        let storage = this.storages_list[empty_rowIndex]

        for (let h = 1; h <= this.num_holes; h++) {

            let hole = other_row.holes_list[h];
            for(let i=0; i < hole.num_seeds; i++)
            {
                other_storage.addSeed();
            }
            hole.emptyHole();
        }

        if(storage.num_seeds > other_storage.num_seeds)
        {
            this.showPlayerWin(storage.id)
        }
        else
        {
            this.showPlayerWin(other_storage.id)
        }
        
    }
    
    
}