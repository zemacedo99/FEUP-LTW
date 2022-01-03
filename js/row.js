class Row {
    constructor(row_num, num_holes, num_seeds) {
        this.id = "row" + row_num.toString();
        this.row_num = row_num;
        this.num_holes = num_holes;
        this.num_seeds = num_seeds;
        this.holes_list = []
        this.createRow()
    }

    createRow() {
        //add child row to parent rows
        const rows = document.getElementById("rows");
        let row = document.createElement("div");
        row.setAttribute("class", "row");
        row.setAttribute("id", this.id);
        rows.appendChild(row);

        //now add holes to the row
        for (let i = 1; i <= this.num_holes; i++) {
            let hole = new Hole(this.row_num, i, this.num_seeds);
            this.holes_list[i] = hole;
        }
    }
}

// function sow(hole)
// {    
//     while(hole.harvested_seeds!=0)
//     {
//         console.log(document.getElementById("rows"));
//         console.log(document.getElementById(hole.id));
//         // get next holes to call hole.addSeed
//         hole.harvested_seeds--;
//     }
// }

