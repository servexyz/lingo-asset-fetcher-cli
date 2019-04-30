const test = require("ava");
const log = console.log;
const path = require("path");
const fs = require("fs");
const npmRun = require("npm-run");

let useNpx = true;
test("laf fetch", t => {
  t.plan(2);
  let outDir = "./AvaDownloads";
  if (useNpx === true) {
    var npx = "npx"; // used on CI environment
  } else {
    npx = ""; //not used when testing local environment / installed binary
  }
  let output = npmRun.execSync(`${npx} laf fetch -o '${outDir}'`);
  t.truthy(output);
  let outPath = path.join(__dirname, "../", outDir);
  t.true(fs.existsSync(outPath));
});
