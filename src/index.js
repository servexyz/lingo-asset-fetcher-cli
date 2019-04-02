import React from "react";
import { render, Box, Text } from "ink";
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

//TODO: Inline introQuestion text.
// * Ended up not using it for original purpose.

class SearchQuery extends React.Component {
	constructor() {
		super();

		this.state = {
			error: "",
			errorInfo: "",
			phase: "",
			introQuestion: "What would you like to do? \n",
			env: {
				spaceId: "",
				apiToken: "",
				outputLoc: ""
			},
			config: {
				quantity: "",
				kits: []
			}
		};
		// * SelectInput
		this.handleIntro = this.handleIntro.bind(this);
		this.handleEnvOutput = this.handleEnvOutput.bind(this);
		// * TextInput
		this.handleEnvApiToken = this.handleEnvApiToken.bind(this);
		this.handleEnvSpaceId = this.handleEnvSpaceId.bind(this);
		this.handleConfigKitQuantity = this.handleConfigKitQuantity.bind(this);
		this.handleConfigKitName = this.handleConfigKitName.bind(this);
		// * Render
		this.renderIntro = this.renderIntro.bind(this);
		this.renderEnv = this.renderEnv.bind(this);
		this.renderConfig = this.renderConfig.bind(this);
	}
	updatePhase(phase) {
		this.setState({ phase });
	}
	handleIntro({ value: phase } = selection) {
		//? Param syntax look weird? See here: https://codeburst.io/renaming-destructured-variables-in-es6-807549754972
		this.setState({ phase });
	}
	handleConfigKitName(name) {
		let idx = this.state.config.kits.length;
		this.setNestedStateConfig({ idx });
	}
	//TODO: since event object is not available, figure out how to create generic handler (ie. can't do e.target.name/value trick)
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
	componentDidCatch(error, errorInfo) {
		this.setState({ error, errorInfo });
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
	renderIntro() {
		if (this.state.phase == "") {
			const wydItems = [
				{
					label: "Add environment variables",
					value: "envSpaceId"
				},
				{
					label: "Generate config boilerplate",
					value: "configKitQuantity"
				}
			];
			return (
				<Box>
					<Text>{this.state.introQuestion}</Text>
					<SelectInput items={wydItems} onSelect={this.handleIntro} />
				</Box>
			);
		}
	}
	renderEnv() {
		if (this.state.phase == "envSpaceId") {
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
		} else if (this.state.phase == "envApiToken") {
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
		} else if (this.state.phase == "envOutputMethod") {
			return envOutput();
		} else if (
			this.state.phase == "envDone" &&
			this.state.env.outputLoc == "dotEnv"
		) {
			let data = `SPACE_ID='${this.state.env.spaceId}'\nAPI_TOKEN='${
				this.state.env.apiToken
			}'`;
			fs.outputFile(".env", data, err => {
				if (err) throw err;
				this.updatePhase("");
			});
			// return (
			// 	<Box>
			// 		<Text>{JSON.stringify(data, null, 2)}</Text>
			// 	</Box>
			// );
		} else if (
			this.state.phase == "envDone" &&
			this.state.env.outputLoc == "clipboard"
		) {
			let data = `SPACE_ID='${this.state.env.spaceId}'\nAPI_TOKEN='${
				this.state.env.apiToken
			}'`;
			// log(`clipboard chosen`);
			clipboardy.writeSync(data);
			this.updatePhase("");
		}
	}
	renderConfig() {
		if (this.state.phase == "configKitQuantity") {
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
		} else if (this.state.phase == "configKitName") {
			return (
				<Box>
					<Text>What's the name of your kit's config?</Text>
					<Text>
						Quantity: {this.state.config.quantity}
						Length: {this.state.config.kits}
					</Text>
					<TextInput
						value={this.state.config.kits}
						onChange={this.handleConfigKitName}
						onSubmit={() => {
							this.state.config.quantity > this.state.config.kits.length
								? () => this.updatePhase("configKitName")
								: () => this.updatePhase("end");
						}}
					/>
				</Box>
			);
		} else if (this.state.phase == "end") {
			return (
				<Box>
					<Text>{JSON.stringify(this.state, null, 2)}</Text>
				</Box>
			);
		}
	}
	render() {
		if (this.state.phase == "") {
			return this.renderIntro();
		} else if (this.state.phase.includes("env")) {
			return this.renderEnv();
		} else if (this.state.phase.includes("config")) {
			return this.renderConfig();
		} else if ((this.state.phase.length == 3) & (this.state.phase == "end")) {
			return (
				<Box>
					<Text>el fin</Text>
				</Box>
			);
		}
	}
}

render(<SearchQuery />);

function envOutput() {
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
