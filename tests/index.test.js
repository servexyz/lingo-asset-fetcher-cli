const test = require("ava");
// const log = console.log;
const path = require("path");
// const fs = require("fs");
const npmRun = require("npm-run");
// const shell = require("shelljs");

test("laf fetch", t => {
  // t.plan(2);
  let outDir = "./AvaDownloads";
  let binPath = path.join(__dirname, "../src/index.js");
  // let output = npmRun.execSync(`${binPath} fetch -o '${outDir}'`);
  npmRun.execSync(`${binPath} fetch -o '${outDir}'`);
  t.pass();
  //TODO: Get below working
  //? More precise to check for directory.
  //? Right now, simply calling t.pass() which will only throw if there's an error
  //? This gives some protection but obviously not ideal
  // log(`ls: ${shell.ls()}`);
  // log(`process.cwd:${process.cwd()}`);
  // t.truthy(output);
  // let outPath = path.join(process.cwd(), outDir);
  // log(`outPath: ${outPath}`);
  // log(`ls: ${shell.ls()}`);
  // t.true(fs.existsSync(outPath));
});
