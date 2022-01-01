class Board {
    constructor(id, num_holes, num_seeds) {
        this.id = id;
        this.num_holes = num_holes;
        this.num_seeds = num_seeds;
        this.rows_list = [];
        this.storages_list = [];
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

    move()
    {

        // console.log("here")
        for (let r = 0; r < 2; r++) {
            let row = this.rows_list[r];

            for (let h = 1; h <= this.num_holes; h++) {

                let hole = row.holes_list[h];
                if (hole.reaping)
                {
                    this.sow(r,h,hole);
                }
            }
        }
    }

    sow(rowIndex,holeIndex,hole)
    {   
        let row = this.rows_list[rowIndex];
        let sow_hole_index = holeIndex;



        while(hole.harvested_seeds != 0)
        {
            sow_hole_index = sow_hole_index + 1;

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
                storage.addSeed(); 
                //change row
                rowIndex = rowIndex ? 0 : 1 

                hole.harvested_seeds--;
                break;
            }
        }

        // console.log(hole.harvested_seeds)

        // for(let i = this.num_holes - 1; i < this.num_holes - hole.harvested_seeds ; i--)
        // {
        //     sow_hole_index = holeIndex + i;
            
        //     let next_hole = row.holes_list[sow_hole_index];
        //     next_hole.addSeed();
           
        //     hole.harvested_seeds--;
        // }
 

        hole.reaping = false;
    }

    
}