const laf = require("laf-lib");

let gen = laf.uGenerateLAFBoilerplate(".laf.json", ["abc", "def", "ghi"]);

console.log(`gen: ${gen}`);
