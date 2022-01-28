class Hole {
    constructor(row, hole, num_seeds) {
        this.row = row;
        this.hole = hole;
        this.id = "hole" + row.toString() + hole.toString();
        this.num_seeds = num_seeds;
        this.seeds_list = [];
        this.createHole();

        let thisHole = this;
        this.reaping = false;
        this.harvested_seeds = 0;
        document.getElementById(this.id).onclick = function () {
            //console.log("on the click");
            let right_player = checkPlayer(thisHole);
            if (right_player) {
                notify(thisHole.hole);
                reap(thisHole);
                move();
            }
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

    emptyHole() {
        this.seeds_list = [];
        this.num_seeds = 0;
        let hole = document.getElementById(this.id);
        hole.innerHTML = '';
    }

    addSeed() {
        let seed = new Seed(this.row, this.hole);
        this.seeds_list[this.num_seeds] = seed;
        this.num_seeds++;
    }

    //maybe here it is where it distributes seed, since it knows where it is and haw many it has
}

//remenber that the seeds are sons of the hole    

function reap(hole) {


    if (hole.num_seeds > 0) {
        hole.harvested_seeds = hole.num_seeds
        hole.reaping = true;
        hole.emptyHole();
        //console.log("reaping in hole");
    }
}