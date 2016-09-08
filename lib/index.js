import fs from 'fs';

import parser from './parser';
import error from './error'

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
    
    parser() {
        return new parser(this.file, 0);
    }
}
