class Seed {
    constructor(row, hole) {
        this.row = row;
        this.hole = hole;
        this.createSeed()
    }

    createSeed() {
        const hole = document.getElementById("hole" + this.row.toString() + this.hole.toString())
        let seed = document.createElement("div");
        seed.setAttribute("class", "seed");
        //aqui tenho que ver como usar o CSSDOM

        hole.appendChild(seed);
    }
}