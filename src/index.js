#!/usr/bin/env node
const log = console.log;
const meow = require("meow");
const laf = require("laf-lib");
// import inkConfig from "./generate.config.sample";

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

  Options
   gen (eg. laf gen) -> Generate required config boilerplate   
  `;

//TODO: Fix @babel/polyfill being loaded twice
//TODO: Add soft/hard flags
// ? Pending diff implementation in LAF lib

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

(function initCli(input = "", flags) {
  log(`inside initCli`);
  if (typeof input[0] == "string") {
    var inp = input[0].toLowerCase();
    if (inp == "gen" || inp == "generate") {
      log(`inside gen`);
      laf.initInk();
    } else if (inp == "f" || inp == "fetch") {
      log(`inside fetch`);
      laf.init(
        "Test Me",
        inkConfig.testMe.targetOne,
        "./downloads/testMeOne",
        "PNG"
      );
    }
  } else {
    //TODO: Set .env
    log(`Please pass a string`);
  }
})(input, flags);

//TODO: Create laf.json parser
