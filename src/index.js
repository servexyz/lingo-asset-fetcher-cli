#!/usr/bin/env node
const log = console.log;
const meow = require("meow");
const laf = require("laf-lib");
const fs = require("fs-extra");
// const { cliConfig, libConfig } = require("./generate.config.sample");

/*
 ****************************************
 * CLI Must Ask
 ****************************************
 * Kit name
 * LAF Object
 * Download dir
 * File format
 ****************************************
 */

const menu = `
  Usage
  $ laf <input>

  Input Options
  * gen (eg. laf gen) -> Generate required config boilerplate   
  * fetch (eg. laf fetch) -> Download everything specified in your config file (.laf.json)

  Flag Options
  * --out, -o (eg. laf --out "./my/directory") -> Download everything to specified directory
  * --cut, -c (eg. laf --cut "PNG") -> Download all PNGs (ie. the "file cut") from your kit
  `;

// ? Pending diff implementation in LAF lib

const optionTree = {
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
// const optionTree = {
// 	flags: {
// 		soft: {
// 			type: "boolean",
// 			alias: s
// 		},
// 		hard: {
// 			type: "boolean",
// 			alias: h
// 		}
// 	}
// };
// const cli = meow(menu, optionTree);

const { input, flags } = meow(menu);

log(`cli.input: ${input}`);
log(`cli.flags: ${JSON.stringify(flags, null, 2)}`);
log(`flags.out: ${flags.out}`);

function initCli(input = "", flags) {
  log(`inside initCli`);
  if (typeof input[0] == "string") {
    var inp = input[0].toLowerCase();
    if (inp == "gen" || inp == "generate") {
      log(`inside gen`);
      laf.initInk();
    } else if (inp == "f" || inp == "fetch") {
      log(`inside fetch`);
      //TODO: Confirm this works when calling from pkg
      let dir = `${process.cwd()}/.laf.json`;
      log(`dir: ${dir}`);
      let config = fs.readJsonSync(dir);
      // log(`config: ${JSON.stringify(config, null, 2)}`);
      // log(`config: ${config}`);
      lafParser(config, flags.out, flags.cut);
    }
  } else {
    log(`Please pass a string`);
  }
}
initCli(input, flags);

/**
 *
 * @param {object} config
 */
function lafParser(config, outputDirectory = "./downloads", fileCut = "PNG") {
  const { name: fileName, value } = config;
  for (const v of Object.values(value.kits)) {
    const { name, sections } = v;
    // log(`name: ${name}\n sections: ${JSON.stringify(sections, null, 2)}`);
    laf.init(name, { sections }, outputDirectory, fileCut);
  }
  log(`fileName: ${fileName}`);
  return Object.assign({}, { fileName });
}

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
