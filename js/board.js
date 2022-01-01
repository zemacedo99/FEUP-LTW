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
}