import React from "react";
import { render, Box, Text, Color } from "ink";
import TextInput from "ink-text-input";
import SelectInput from "ink-select-input";
import fs from "fs-extra";
import clipboardy from "clipboardy";
const log = console.log;

import * as laf from "lingo-asset-fetcher-lib";
import indexConfig from "./index.config";

// laf.init("Test Me", config.testMe.targetOne, "./downloads/testMeOne", "PNG");

// Library: Use case
//--------------------------------------
// INK: Config generation
// MEOW: Running from package.json

/*
  * Select Input: [Add relevant environment variables, Generate config boilerplate]
  1. Relevant environment variables: 

  * Text Input: 
  1. Lingo Space ID: 000000
  2. API Key: token

  * Text Input: 
  1. How many kits? 2
  2. Name of kit: Foobar
  3. Name of kit: Foobar
*/

//TODO: Add a check if laf.json already exists to prevent overwriting
class SearchQuery extends React.Component {
	constructor() {
		super();

		this.state = {
			error: "",
			errorInfo: "",
			phase: "",
			env: {
				spaceId: "",
				apiToken: "",
				outputLoc: ""
			},
			config: {
				quantity: "",
				tempKitName: "",
				kits: [],
				outputLoc: ""
			}
		};

		/*
		 ***********************************************
		 *	Binding
		 ************************************************
		 */
		// * SelectInput
		this.handleIntro = this.handleIntro.bind(this);
		this.handleEnvOutput = this.handleEnvOutput.bind(this);
		// * TextInput
		this.handleEnvApiToken = this.handleEnvApiToken.bind(this);
		this.handleEnvSpaceId = this.handleEnvSpaceId.bind(this);
		this.handleConfigKitQuantity = this.handleConfigKitQuantity.bind(this);
		this.handleConfigKitName = this.handleConfigKitName.bind(this);
	}
	/*
	 ***********************************************
	 *	Update Phase
	 ************************************************
	 */
	updatePhase(phase) {
		this.setState({ phase });
	}

	/*
	 ***********************************************
	 *	Handlers
	 ************************************************
	 */

	handleIntro({ value: phase } = selection) {
		//? Param syntax look weird? See here: https://codeburst.io/renaming-destructured-variables-in-es6-807549754972
		this.setState({ phase });
	}
	handleEnvOutput(outputLoc) {
		this.setNestedStateEnv({ outputLoc });
	}
	handleConfigOutput(outputLoc) {
		this.setNestedStateConfig({ outputLoc });
	}
	handleEnvApiToken(apiToken) {
		this.setNestedStateEnv({ apiToken });
	}
	handleEnvSpaceId(spaceId) {
		this.setNestedStateEnv({ spaceId });
	}
	handleConfigKitQuantity(quantity) {
		this.setNestedStateConfig({ quantity });
	}
	handleConfigKitName(name) {
		this.setNestedStateConfig({ tempKitName: name });
	}
	//TODO: Fix the infinite loop for kit names
	handleConfigKitNameSubmit() {
		const {
			config,
			config: { tempKitName: name }
		} = this.state;
		if (name.length > 0) {
			const kits = [...Array.from(config.kits), { name }];
			this.setState(({ config }) => {
				return {
					config: {
						...config,
						kits,
						tempKitName: ""
					}
				};
			});
		}
	}
	/*
	***********************************************
	*	setNestedState Factories
	************************************************
	? since event object is not available, what's the best way to create a generic handler?
	? (ie. can't do e.target.name/value trick)
	*/

	setNestedStateEnv(kv) {
		let key = Object.keys(kv);
		this.setState(({ env }) => ({
			env: {
				...env,
				[key]: kv[key]
			}
		}));
	}
	setNestedStateConfig(kv) {
		let key = Object.keys(kv);
		this.setState(({ config }) => ({
			config: {
				...config,
				[key]: kv[key]
			}
		}));
	}
	/*
	 ***********************************************
	 *	Event Lifecycle
	 ************************************************
	 */
	// componentDidUpdate() {
	// 	log(`this.state: ${JSON.stringify(this.state, null, 2)}`);
	// }
	componentDidCatch(error, errorInfo) {
		this.setState({ error, errorInfo });
	}

	/*
	 ***********************************************
	 * Components
	 ************************************************
	 */
	cIntro() {
		//TODO: Add exit as third option
		const wydItems = [
			{
				label: "Generate empty boilerplate",
				value: "emptyBoilerplate"
			},
			{
				label: "Generate boilerplate interactively",
				value: "interactiveBoilerplate"
			}
		];
		return (
			<Box>
				<Text>What would you like to do?</Text>
				<SelectInput items={wydItems} onSelect={this.handleIntro} />
			</Box>
		);
	}
	//TODO: Refactor cEnd to "cConfigEnd"
	cEnd() {
		const {
			spaceId,
			apiToken,
			config: { outputLoc, kits }
		} = this.state;
		//TODO: Abstract below into utility function for cEnd and cEnvDone's inline function
		let config = JSON.stringify(
			this.uGenerateLAFBoilerplate(".laf.json", Object.values(kits)),
			null,
			2
		);
		if (outputLoc == "dotLAF") {
			fs.outputFile(".laf.json", config, err => {
				if (err) throw err;
			});
		} else if (outputLoc == "clipboardConfig") {
			clipboardy.writeSync(config);
		}
		return (
			<Box>
				<Text>state: ${JSON.stringify(this.state, null, 2)}</Text>
			</Box>
		);
	}
	//TODO: Validate config.quantity. Must be int
	cConfigKitQuantity() {
		return (
			<Box>
				<Text>How many kits would you like to download assets from?</Text>
				&nbsp;
				<TextInput
					value={this.state.config.quantity}
					onChange={this.handleConfigKitQuantity}
					onSubmit={() => {
						this.updatePhase("configKitName");
					}}
					placeholder="#"
				/>
			</Box>
		);
	}
	cError(functionName, err) {
		return (
			<Box>
				<Color blue>{functionName}(): </Color>
				<Color red>Error: {err}</Color>
			</Box>
		);
	}
	cEmptyBoilerplate(rootDir = "./", kitNames = [""]) {
		let env = { name: ".env", value: `SPACE_ID=''\nAPI_TOKEN=''` };
		let config = this.uGenerateLAFBoilerplate(".laf.json", kitNames);
		fs.outputFile(`${rootDir}/${env.name}`, env.value, err => {
			if (err) return this.cError("cEmptyBoilerplate", err);
		});
		fs.outputFile(
			`${rootDir}/${config.name}`,
			JSON.stringify(config.value, null, 2),
			err => {
				if (err) return this.cError("cEmptyBoilerplate", err);
			}
		);
		return (
			<Box>
				<Text>
					<Color blue>{config.name}</Color> & <Color blue>{env.name}</Color> has
					been generated.
				</Text>
			</Box>
		);
	}
	//TODO: Add check after config is generated to output to clipboard or file
	cEnvSpaceId() {
		return (
			<Box>
				<Text>What's your Lingo Space ID?</Text>&nbsp;
				<TextInput
					value={this.state.env.spaceId}
					onChange={this.handleEnvSpaceId}
					onSubmit={() => this.updatePhase("envApiToken")}
					placeholder="000000"
				/>
			</Box>
		);
	}
	cEnvApiToken() {
		return (
			<Box>
				<Text>What's your Lingo API Token?</Text>&nbsp;
				<TextInput
					value={this.state.env.apiToken}
					onChange={this.handleEnvApiToken}
					onSubmit={() => this.updatePhase("envOutputMethod")}
					placeholder="token"
				/>
			</Box>
		);
	}
	//TODO: Abstract handleEnvOutput method
	cConfigOutputMethod() {
		let configOutputItems = [
			{
				label: "Write to ./.laf.json",
				value: "dotLAF"
			},
			{
				label: "Write to clipboard",
				value: "clipboardConfig"
			}
		];
		return this.cOutputMethodSelector(configOutputItems, "config", "end");
	}
	cEnvOutputMethod() {
		let envOutputItems = [
			{
				label: "Write to ./.env",
				value: "dotEnv"
			},
			{
				label: "Write to clipboard",
				value: "clipboard"
			}
		];
		return this.cOutputMethodSelector(
			envOutputItems,
			"env",
			"configKitQuantity"
		);
	}
	cOutputMethodSelector(items, parent, nextPhase) {
		return (
			<Box>
				<Text>{`Where would you like to output this data?\n`}</Text>
				<SelectInput
					items={items}
					onSelect={({ value } = outputLoc) => {
						parent === "env"
							? this.handleEnvOutput(value)
							: this.handleConfigOutput(value);
						this.updatePhase(nextPhase);
					}}
				/>
			</Box>
		);
	}
	cConfigKitName() {
		return (
			<Box>
				<Text>What's the name of your kit's config?</Text>
				&nbsp;
				<TextInput
					value={this.state.config.tempKitName}
					onChange={this.handleConfigKitName}
					onSubmit={() => {
						this.handleConfigKitNameSubmit();
					}}
				/>
			</Box>
		);
	}
	/*
	 ***********************************************
	 * Utilities
	 ************************************************
	 */
	//TODO: Create uGenerateEnvBoilerplate
	//TODO: Update emptyBoilerplate & interactiveBoilerplate with new Env generator
	uGenerateLAFBoilerplate(configName, kitNames) {
		let kits = kitNames.map(kit => {
			return {
				name: kit,
				sections: [
					{
						name: "",
						headers: [""]
					}
				]
			};
		});
		return {
			name: configName,
			value: {
				kits
			}
		};
	}
	/*
	 ***********************************************
	 * Conditional Rendering (phase checkers)
	 ************************************************
	 */
	renderIntro() {
		if (this.state.phase == "") {
			return this.cIntro();
		}
		if (this.state.phase == "emptyBoilerplate") {
			return this.cEmptyBoilerplate();
		} else if (this.state.phase == "interactiveBoilerplate") {
			return this.cEnvSpaceId();
		}
	}
	renderEnv() {
		const {
			phase,
			env: { outputLoc, spaceId, apiToken }
		} = this.state;
		switch (phase) {
			case "envSpaceId":
				return this.cEnvSpaceId();
			case "envApiToken":
				return this.cEnvApiToken();
			case "envOutputMethod":
				return this.cEnvOutputMethod();
			case "envDone":
				let data = `SPACE_ID='${spaceId}'\nAPI_TOKEN='${apiToken}'`;
				if (outputLoc == "dotEnv") {
					fs.outputFile(".env", data, err => {
						if (err) throw err;
					});
				} else if (outputLoc == "clipboard") {
					clipboardy.writeSync(data);
				}
				return this.cConfigKitQuantity();
			default:
				return (
					<Box>
						<Text>
							Nothing found in <Color blue>renderEnv()</Color>
						</Text>
					</Box>
				);
		}
	}
	renderConfig() {
		const { phase, config } = this.state;
		switch (phase) {
			case "configKitQuantity":
				return this.cConfigKitQuantity();
			case "configKitName":
				if (config.kits.length < config.quantity) {
					return this.cConfigKitName();
				} else {
					return this.cConfigOutputMethod();
				}
			// case "configDone":
			// 	return this.cConfigOutputMethod();
			default:
				return (
					<Box>
						<Text>
							Nothing found in <Color blue>renderConfig()</Color>
						</Text>
					</Box>
				);
		}
	}
	//TODO: Remove unnecessary this statements
	render() {
		const { phase } = this.state;
		if (phase.includes("Boilerplate") || phase == "") {
			return this.renderIntro();
		} else if (phase.includes("env")) {
			return this.renderEnv();
		} else if (phase.includes("config")) {
			return this.renderConfig();
		} else if (phase == "end") {
			return this.cEnd();
		}
	}
}

render(<SearchQuery />);
