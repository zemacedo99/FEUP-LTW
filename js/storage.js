class Storage {
    constructor(id) {
        this.id = id;
        this.num_seeds = 0;
        this.seeds_list = [];
        this.getStorage();
    }

    getStorage() {
        this.element = document.getElementById("hole" + this.id.toString());
        // console.log(this.element);
    }

    addSeed()
    {
        let seed = new Seed(this.id, 0);
        this.seeds_list[this.num_seeds] = seed;
        this.num_seeds++;
    }
}