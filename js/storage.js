class Storage {
    constructor(id) {
        this.id = id;
        this.num_seeds = 0;
        this.seeds_list = [];
        this.showScore();
    }

    showScore()
    {
        let score = document.getElementById("score" + this.id.toString());
        score.value = this.num_seeds;
        score.innerHTML = score.value;
    }

    addSeed()
    {
        let seed = new Seed(this.id, 0);
        this.seeds_list[this.num_seeds] = seed;
        this.num_seeds++;

        this.showScore();
    }
}