import fs from 'fs';

export default class cheddarfile {
    constructor(path: string = "cheddarfile") {
        this.path = path;

        this.file = "";
    }

    ready(callback) {
        fs.readFile(this.path, "utf-8", (error, data) =>
            callback((this.file = data) && this, error)
        );
    }
}
