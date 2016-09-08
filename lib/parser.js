// Basic Parser wrapper
import ParserEngine from './parser/engine';
import Language from './parser/language';
import Derivation from './parser/derivation';

import chars from './characters';

export default function Parser(source) {
    let cheddarfile = new Language([
        new Derivation('@alpha', chars.alpha),
        new Derivation('@digits', chars.digits),
        new Derivation('@data', chars.data),
        
        /** == @INFO == **/
        new Derivation('@INFO_TITLE', [
            ['@data', '{merge}@INFO_TITLE'],
            ['{discard}\\', ':', '{merge}@INFO_TITLE'],
            []
        ], false),
        
        new Derivation('@INFO_DESC_TEXT', [
            ['{not}\n', '{merge}@INFO_DESC_TEXT'],
            []
        ], false),
        
        new Derivation('@INFO_DESC', [
            ['{discard}:', '@INFO_DESC_TEXT'],
            []
        ]),
        
        new Derivation('@INFO', [
            ['@INFO_TITLE', '@INFO_DESC']
        ]),
        
        
        /** == @ROOT == **/
        new Derivation('@ROOT', [
            [''],
            []
        ]),
        
        
        /** == @MODULES == **/
        new Derivation('@MODULES', [
            [],
            []
        ]),
        
        /** == MAIN BLOCK == **/
        new Derivation('main', [
            ['@INFO'/*, '\n', '@VERSION', '\n', '@ROOT', '\n', '@MODULES'*/]
        ])
    ]);
    
    return ParserEngine(cheddarfile, `Ched\\:dar:The language that works for you`);
}