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
        document.getElementById(this.id).onclick = function ()
        {
            let right_player = checkPlayer(thisHole);
            if(right_player)
            {
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
        let hole = document.getElementById(this.id);
        hole.innerHTML = '';
    }

    set_num_seeds(n) {
        this.num_seeds = n.toString();
    }

    empty_seeds_list()
    {
        this.seeds_list = [];
    }

    addSeed()
    {
        let seed = new Seed(this.row, this.hole);
        this.seeds_list[this.num_seeds] = seed;
        this.num_seeds++;
    }

    //maybe here it is where it distributes seed, since it knows where it is and haw many it has
}

//remenber that the seeds are sons of the hole    

function reap(hole)
{       
    if(hole.num_seeds > 0)
    {
        hole.harvested_seeds = hole.num_seeds
        hole.reaping = true;
        hole.emptyHole();
        hole.set_num_seeds(0);
        hole.empty_seeds_list();
    }
}