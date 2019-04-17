#!/usr/bin/env node
const log = console.log;
const meow = require("meow");
const laf = require("laf-lib");
const fs = require("fs-extra");

const menu = `
  Usage
  $ laf <input>

  Input Options (only choose one)
  * gen, generate -> Generate required config boilerplate   
  $ laf gen

  * f, fetch -> Download everything specified in your config file (.laf.json)
  $ laf fetch

  Flags (can be used together)
  * --out, -o -> Download everything to specified directory
  $ laf --out "./my/directory"

  * --cut, -c -> Download all PNGs (ie. the "file cut") from your kit
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

//TODO: Update menu with new flags
//TODO: Create --dev flag to prevent overwriting .laf.json & .env
//TODO: Create --out flag to dictate downloads directory
//TODO: Create --cut flag to specify file type
//TODO: Add --soft flag (triage, move to GH issues)
//TODO: Add --hard flag (triage, move to GH issues)

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
