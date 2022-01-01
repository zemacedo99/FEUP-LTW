class Storage {
    constructor(id) {
        this.id = "storage" + id.toString();
        this.seeds_list = [];
        this.getStorage();
    }

    getStorage() {
        this.element = document.getElementById(this.id);
        // console.log(this.element);
    }
}