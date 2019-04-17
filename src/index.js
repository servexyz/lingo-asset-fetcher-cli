// #!/usr/bin/env node
const log = console.log;
const meow = require("meow");
const laf = require("laf-lib");
const fs = require("fs-extra");

const menu = `
  Usage
  $ laf <input>

  Input Options (only choose one)
  1. gen, generate -> Generate required config boilerplate   
  $ laf gen

  2. f, fetch -> Download everything specified in your config file (.laf.json)
  $ laf fetch

  Flags (can be used together)
  1. --out, -o -> Download everything to specified directory
  $ laf --out "./my/directory"

  2. --cut, -c -> Download all PNGs (ie. the "file cut") from your kit
  $ laf --cut "PNG"
  `;

const flagTree = {
  flags: {
    out: {
      type: "string",
      alias: "o"
    },
    cut: {
      type: "string",
      alias: "c"
    }
  }
};

//TODO: Add soft & hard flags (pending diff implementation in LAF lib)
//TODO: Brainstorm best way to handle API rate limit (since it's so low, they're likely to hit)
const { input, flags } = meow(menu, flagTree);

/**
 *
 * @param {object} config
 */
function lafParser(config, outputDirectory = "./downloads", fileCut = "PNG") {
  const { name: fileName, value } = config;
  for (const v of Object.values(value.kits)) {
    const { name, sections } = v;
    laf.init(name, { sections }, outputDirectory, fileCut);
  }
  return Object.assign({}, { fileName });
}

/**
 *
 * @param {string} input
 * @param {object} flags
 */
function initCli(input = "", flags) {
  if (typeof input[0] == "string") {
    var inp = input[0].toLowerCase();
    if (inp == "gen" || inp == "generate") {
      laf.initInk();
    } else if (inp == "f" || inp == "fetch") {
      let dir = `${process.cwd()}/.laf.json`;
      let config = fs.readJsonSync(dir);
      lafParser(config, flags.out, flags.cut);
    }
  } else {
    log(`Please pass a string`);
  }
}
initCli(input, flags);

//TODO: Add --soft flag (triage, move to GH issues)
//TODO: Add --hard flag (triage, move to GH issues)
//TODO: Consider adding --dev flag to prevent overwriting .laf.json & .env when using generate

/*
----------------------------------------------
Goal:
----------------------------------------------
init(
	"Capswan - Mobile App - Style Guide",
	config.capswan.targetOne,
	"./downloads/capswan/One",
	"PNG"
);
----------------------------------------------
*/
