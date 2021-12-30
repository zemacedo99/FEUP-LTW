class Hole {
    constructor(row, hole, num_seeds) {
        this.row = row;
        this.hole = hole;
        this.id = "hole" + row.toString() + hole.toString();
        this.num_seeds = num_seeds;
        this.seeds_list = [];
        this.createHole();
        let x = this;
        document.getElementById(this.id).onclick = function ()
        {
            console.log(this)
            sow(x);
        }
    }

    createHole() {
        //add child hole to parent hole
        const row = document.getElementById("row" + (this.row).toString());
        let hole = document.createElement("div");
        hole.setAttribute("class", "hole");
        hole.setAttribute("id", this.id);
        row.appendChild(hole);

        //now fill the hole with seeds
        for (let i = 0; i < this.num_seeds; i++) {
            let seed = new Seed(this.row, this.hole);
            this.seeds_list[i] = seed;
        }
    }


    //addSeed() function to add a seed in hole

    //maybe here it is where it distributes seed, since it knows where it is and haw many it has
}

//remenber that the seeds are sons of the hole    

function sow(hole)
{       
    // let id = "hole" + row.toString() + hole.toString();
    console.log(hole)
    console.log(hole.hole)
}