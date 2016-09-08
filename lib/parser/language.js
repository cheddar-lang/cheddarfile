import derivation from './derivation';

export default class Language {
    constructor(rules) {
        this.rules = new Map(rules.map(rule => [rule.name, rule.data]));
    }
    
    get(rule) {
        return this.rules.get(rule);
    }
}