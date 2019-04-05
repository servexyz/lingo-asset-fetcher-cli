// #!/usr/bin/env node
const log = console.log;
import meow from "meow";
import { initInk } from "./generate";
// import * as laf from "lingo-asset-fetcher-lib";
// import inkConfig from "./generate.config.sample";

const menu = `
  Usage
  $ laf <input>

  Options
   gen (eg. laf gen) -> Generate required config boilerplate   
  `;

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
const cli = meow(menu);

init(cli.input, cli.flags);

function init(input = "", flags) {
	if (typeof input[0] == "string") {
		var inp = input[0].toLowerCase();
		if (inp == "gen" || inp == "generate") {
			initInk();
		}
	} else {
		//TODO: Set .env
		log(`inside`);
		// laf.init(
		// 	"Test Me",
		// 	inkConfig.testMe.targetOne,
		// 	"./downloads/testMeOne",
		// 	"PNG"
		// );
	}
}
