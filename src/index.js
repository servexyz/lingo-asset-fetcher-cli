#!/usr/bin/env node
const log = console.log;
const meow = require("meow");
const laf = require("laf-lib");
const { cliConfig, libConfig } = require("./generate.config.sample");
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
});
// })(input, flags);

//TODO: Create laf.json parser
/**
 *
 * @param {object} config
 */

//TODO: Finished lafParser
log(
  `parsed config: ${JSON.stringify(
    (function lafParser(config) {
      const { name: fileName, value } = config;
      // let x = Object.values(value.kits).map(kit => {
      //   const { name, sections } = kit;
      //   return new Promise((reject, resolve) => {
      //     try {
      //       resolve(laf.init(name, { sections }, "./downloads/cs/one", "png"));
      //     } catch (err) {
      //       reject(err);
      //     }
      // 	});
      // });
      for (const v of Object.values(value.kits)) {
        // log(`v: ${JSON.stringify(v, null, 2)}`);
        const { name, sections } = v;
        log(`name: ${name}\n sections: ${JSON.stringify(sections, null, 2)}`);
        laf.init(name, { sections });
      }
      log(`fileName: ${fileName}`);
      return Object.assign({}, { fileName });
    })(cliConfig),
    null,
    2
  )}`
);

//TODO: Create --dev flag to prevent overwriting .laf.json & .env

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
