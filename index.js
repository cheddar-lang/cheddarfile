try {
    module.exports = require("./dist/index.js");
} catch(e) {
    throw new Error("No build found. Build using `make`");
}
