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
        let degrees = Math.random() * 100;
        let transX = Math.random() * 20;
        let transY = Math.random() * 10;

        seed.style.transform = "rotate(" + degrees.toString() + "deg)" + "translate(" + transX.toString() + "px, " + transY.toString() + "px)";


        hole.appendChild(seed);
    }
}