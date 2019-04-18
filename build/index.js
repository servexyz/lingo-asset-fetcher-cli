#!/usr/bin/env node
"use strict";

var log = console.log;

var meow = require("meow");

var laf = require("laf-lib");

var fs = require("fs-extra");

var menu = "\n  Usage\n  $ laf <input>\n\n  Input Options (only choose one)\n  1. gen, generate -> Generate required config boilerplate   \n  $ laf gen\n\n  2. f, fetch -> Download everything specified in your config file (.laf.json)\n  $ laf fetch\n\n  Flags (can be used together)\n  1. --out, -o -> Download everything to specified directory\n  $ laf --out \"./my/directory\"\n\n  2. --cut, -c -> Download all PNGs (ie. the \"file cut\") from your kit\n  $ laf --cut \"PNG\"\n  ";
var flagTree = {
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
}; //TODO: Add soft & hard flags (pending diff implementation in LAF lib)
//TODO: Brainstorm best way to handle API rate limit (since it's so low, they're likely to hit)

var _meow = meow(menu, flagTree),
    input = _meow.input,
    flags = _meow.flags;
/**
 *
 * @param {object} config
 */


function lafParser(config) {
  var outputDirectory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "./downloads";
  var fileCut = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "PNG";
  var fileName = config.name,
      value = config.value;

  for (var _i = 0, _Object$values = Object.values(value.kits); _i < _Object$values.length; _i++) {
    var v = _Object$values[_i];
    var name = v.name,
        sections = v.sections;
    laf.init(name, {
      sections: sections
    }, outputDirectory, fileCut);
  }

  return Object.assign({}, {
    fileName: fileName
  });
}
/**
 *
 * @param {string} input
 * @param {object} flags
 */


function initCli() {
  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var flags = arguments.length > 1 ? arguments[1] : undefined;

  if (typeof input[0] == "string") {
    var inp = input[0].toLowerCase();

    if (inp == "gen" || inp == "generate") {
      laf.initInk();
    } else if (inp == "f" || inp == "fetch") {
      var dir = "".concat(process.cwd(), "/.laf.json");
      var config = fs.readJsonSync(dir);
      lafParser(config, flags.out, flags.cut);
    }
  } else {
    log("Please pass an input string (gen, fetch) like so (eg. laf gen, laf fetch)");
  }
}

initCli(input, flags); //TODO: Add --soft flag (triage, move to GH issues)
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