const test = require("ava");
const log = console.log;
const path = require("path");
const fs = require("fs");
const npmRun = require("npm-run");

test("laf fetch", t => {
  t.plan(2);
  let outDir = "./AvaDownloads";
  let npx = "npx"; //remote/Travis
  // let npx = ""; //local/run installed LAF
  let output = npmRun.execSync(`${npx} laf fetch -o ${outDir}`);
  t.truthy(output);
  let outPath = path.join(__dirname, "../", outDir);
  t.true(fs.existsSync(outPath));
});
