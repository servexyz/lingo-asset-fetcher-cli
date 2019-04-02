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
//TODO: Break up components into second file
// * Ended up not using it for original purpose.

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
				index: 0,
				kits: [""]
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
	//TODO: Replace all manual instances of setState({phase}) with updatePhase
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
	handleConfigKitName(name) {
		const { kits } = this.state.config;
		log(`kits: ${kits}`);
		let idx = Array.from(this.state.config.kits).length;
		this.setNestedStateConfig({ idx });
	}
	handleEnvOutput(outputLoc) {
		//TODO: Figure out workaround to the onHighlight failure
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

	//TODO: since event object is not available, figure out how to create generic handler (ie. can't do e.target.name/value trick)
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
					onSubmit={() => this.updatePhase("configKitName")}
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
				<Text>Quantity: {this.state.config.quantity}</Text>
				<TextInput
					value={this.state.config.kits[this.state.config.index]}
					onChange={this.handleConfigKitName}
				/>
			</Box>
		);
	}
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
			env: { outputLoc }
		} = this.state;
		switch (phase) {
			case "envSpaceId":
				return this.cEnvSpaceId();
			case "envApiToken":
				return this.cEnvApiToken();
			case "envOutputMethod":
				return this.cEnvOutputMethod();
			case "envDone":
				let data = `SPACE_ID='${this.state.env.spaceId}'\nAPI_TOKEN='${
					this.state.env.apiToken
				}'`;
				if (outputLoc == "dotEnv") {
					fs.outputFile(".env", data, err => {
						if (err) throw err;
					});
				} else if (outputLoc == "clipboard") {
					clipboardy.writeSync(data);
				}
				//TODO: Nest the configKitQuantity call
				return this.cConfigKitQuantity();
				break;
			default:
				return (
					<Box>
						<Text>Nothing found in renderEnv()</Text>
					</Box>
				);
		}
	}
	renderConfig() {
		if (this.state.phase == "configKitQuantity") {
			return this.cConfigKitQuantity();
		} else if (this.state.phase == "configKitName") {
			return this.cConfigKitName();
		}
	}
	render() {
		const { phase } = this.state;
		if (phase.includes("Boilerplate") || phase == "") {
			return this.renderIntro();
		} else if (phase.includes("env")) {
			return this.renderEnv();
		} else if (phase.includes("config")) {
			return this.renderConfig();
		} else if (phase == "end") {
			return (
				<Box>
					<Text>el fin</Text>
				</Box>
			);
		}
	}
}

render(<SearchQuery />);
