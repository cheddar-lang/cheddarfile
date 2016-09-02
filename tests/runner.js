var cheddarfile = require('../');
var path = require('path');

new cheddarfile(path.resolve(__dirname, './cf/1'))
    .ready(function(cheddarfile, error) {
        if (error) throw error;
        
        console.log(cheddarfile);
});
