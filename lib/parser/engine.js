import Data from './data';
import match from './match';

function strAt(data, target) {
    if ( data.source.indexOf(target, data.index) === data.index ) {
        data.index += target.length;
        return true;
    } else {
        return false;
    }
}

const NOT_FOUND = Symbol("NOT_FOUND");

function ParserExec(target, rule, data) {
    // target = place to keep match tokens in
    // rule = rule to parse
    // data = the data, including language, code, & index
    
    // Handle modifiers
    let modifier = /^\{([a-z]+)\}(.+)$/.exec(rule);
    
    if (modifier) {
        rule = modifier[2]; // Remove {...}
        modifier = modifier[1]; // Set to word
    }
    
    // Get the rule
    let ruleToParse = data.language.get(rule);
    let parsingARule = !!ruleToParse;

    if (parsingARule) {
        
        let success = false;
        let derivationMatches;
        
        let currentIndex = data.index;
        
        derivation_loop: for (let i = 0; i < ruleToParse.length; i++) {
            
            derivationMatches = new match(rule);
            
            data.index = currentIndex;
            
            for (let j = 0; j < ruleToParse[i].length; j++) {
                let response = ParserExec(derivationMatches, ruleToParse[i][j], data);

                // If the match errored try something else
                if (response === NOT_FOUND) {
                    continue derivation_loop;
                }
                
                // Handle merging
                if (modifier === 'merge') {
                    let item = derivationMatches.data.pop();
                    
                    if (typeof item === 'string') {
                        derivationMatches.add(item);
                    } else {
                        for (let k = 0; k < item.data.length; k++) {
                            derivationMatches.add(item.data[k]);
                        }
                    }
                }
                
            }
            
            success = true;
            break
        }
        
        if (success === true) {
            derivationMatches.convert();
            target.add(derivationMatches);
        } else {
            return NOT_FOUND;
        }
    } else {
        // Parsing literal
        
        // invert output based on modifier
        let invert = modifier === 'not';
        
        // Check if the it matches
        // strAt automatically increments index
        if (strAt(data, rule) ^ invert) {
            if (modifier !== 'discard') {
                target.add(rule);
            } else {
                target.add("");
            }
        } else {
            return NOT_FOUND;
        }
    }
}

export default function ParserEngine(language, source) {
    let data = new Data(language, source);
    ParserExec(data.matches, 'main', data);
    return data;
}