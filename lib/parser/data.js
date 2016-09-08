import match from './match';

export default class ParseData {
    constructor(language, source) {
        this.language = language;
        this.index = 0;
        this.source = source;
        
        this.matches = new match('main');
    }
}