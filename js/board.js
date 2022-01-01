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
            let storage = new Storage(i+1);
            this.storages_list[i] = storage;
        }
    }   

    move()
    {

        // console.log("here")
        for (let r = 0; r < 2; r++) {
            let row = this.rows_list[r];

            for (let h = 0; h < this.num_holes; h++) {

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

        for(let i=1; i <= hole.harvested_seeds; i++)
        {
            let sow_hole_index = holeIndex + i;
            if(sow_hole_index < this.num_holes)
            {
                console.log(sow_hole_index)
                let next_hole = row.holes_list[sow_hole_index];
                next_hole.addSeed();
            }
            else
            {
                //add to storage and change row
            }
            // console.log(document.getElementById("rows"));
            // console.log(document.getElementById(hole.id));
            // get next holes to call hole.addSeed
            hole.harvested_seeds--;
        }
        hole.reaping = false;
    }
}