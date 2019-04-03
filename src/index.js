import React from "react";
import { render, Box, Text, Color } from "ink";
import TextInput from "ink-text-input";
import SelectInput from "ink-select-input";
import fs from "fs-extra";
import clipboardy from "clipboardy";
const log = console.log;

import * as laf from "lingo-asset-fetcher-lib";
import config from "./index.config";

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
				kits: []
			}
		};

		/*
		 ***********************************************
		 *	Binding
		 ************************************************
		 */
		//TODO: Cleanup binds. Don't actually need the render or components. Just added out of habit
		// * SelectInput
		this.handleIntro = this.handleIntro.bind(this);
		this.handleEnvOutput = this.handleEnvOutput.bind(this);
		// * TextInput
		this.handleEnvApiToken = this.handleEnvApiToken.bind(this);
		this.handleEnvSpaceId = this.handleEnvSpaceId.bind(this);
		this.handleConfigKitQuantity = this.handleConfigKitQuantity.bind(this);
		this.handleConfigKitName = this.handleConfigKitName.bind(this);
		// * Render
		this.renderEnv = this.renderEnv.bind(this);
		this.renderConfig = this.renderConfig.bind(this);
		this.renderIntro = this.renderIntro.bind(this);
		// * Components
		this.cIntro = this.cIntro.bind(this);
		this.cEmptyBoilerplate = this.cEmptyBoilerplate.bind(this);
		this.cError = this.cError.bind(this);
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
	//TODO: Refactor functions to have
	handleIntro({ value: phase } = selection) {
		//? Param syntax look weird? See here: https://codeburst.io/renaming-destructured-variables-in-es6-807549754972
		this.setState({ phase });
	}
	handleEnvOutput(outputLoc) {
		this.setNestedStateEnv({ outputLoc });
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
		//TODO: Fix "TypeError: Cannot read property 'length' of undefined"
		this.setNestedStateConfig({ tempKitName: name });

		// log(`config.quantity: ${config.quantity}`);
		// this.setState(({ config }) => {
		// 	// const existingKits = config.kits === null ? [] : [...config.kits];
	}
	//? since event object is not available, what's the best way to create a generic handler?
	//? (ie. can't do e.target.name/value trick)
	/*
	 ***********************************************
	 *	setNestedState Factories
	 ************************************************
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
	componentDidCatch(error, errorInfo) {
		this.setState({ error, errorInfo });
	}

	//TODO: Figure out the render order here... Think the issue is this needs to be added as handler.
	// * Check for config.quantity on the submit

	componentDidMount() {
		// ? Is this poor form since resetting state here? Idk if this forces a subsequent re-render / adds to queue?
		log(`willmount`);
		const {
			config: { tempKitName: name }
		} = this.state;
		log(`name: ${name}`);
		if (name.length > 0) {
			log(`inside`);
			// ? Is this a legal assignment or do I need to replicate the config variable here?
			const kits = [...config.kits, { name }]; // state.kits.concat(state.tempKitName);
			log(`kits: ${kits}`);
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
	cEmptyBoilerplate(rootDir = "./") {
		let env = { name: ".env", value: `SPACE_ID=''\nAPI_TOKEN=''` };
		let config = {
			name: ".laf.json",
			value: {
				kits: [
					{
						name: "",
						sections: [
							{
								name: ""
							},
							{
								name: "",
								headers: ["", ""]
							}
						]
					},
					{
						name: "",
						sections: [
							{
								name: "",
								headers: ["", ""]
							},
							{
								name: ""
							}
						]
					}
				]
			}
		};
		fs.outputFile(`${rootDir}/${config.name}`, env.value, err => {
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
					<Color blue>{config.name}</Color> and <Color blue>{env.name}</Color>{" "}
					have been created
				</Text>
			</Box>
		);
	}
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
		return (
			<Box>
				<Text>{`Where would you like to output this data?\n`}</Text>
				<SelectInput
					items={envOutputItems}
					onSelect={({ value } = outputLoc) => {
						this.handleEnvOutput(value);
						this.updatePhase("envDone");
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
						this.updatePhase("end");
					}}
				/>
			</Box>
		);
	}
	renderIntro() {
		if (this.state.phase == "") {
			// return this.cIntro();
			return this.cConfigKitQuantity(); //temporary testing
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
		const { phase } = this.state;
		if (phase == "configKitQuantity") {
			return this.cConfigKitQuantity();
		} else if (phase == "configKitName") {
			return this.cConfigKitName();
		}
	}
	render() {
		const { phase, config } = this.state;
		if (phase.includes("Boilerplate") || phase == "") {
			return this.renderIntro();
		} else if (phase.includes("env")) {
			return this.renderEnv();
		} else if (phase.includes("config")) {
			return this.renderConfig();
		} else if (phase == "end") {
			return (
				<Box>
					<Text>tempKitName: {config.tempKitName}</Text>
					<Text>state: ${JSON.stringify(this.state, null, 2)}</Text>
				</Box>
			);
		}
	}
}

render(<SearchQuery />);
