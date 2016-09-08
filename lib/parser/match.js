export default class Match {
    constructor(name, ...data) {
        this.name = name;
        this.data = data;
    }
    
    add(match) {
        this.data.push(match);
    }
    
    convert() {
        if (this.data.every(i => typeof i === 'string')) {
            this.data = this.data.join("");
        }
    }
}