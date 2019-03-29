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
			}
		};
		// * SelectInput
		this.handleIntro = this.handleIntro.bind(this);
		this.handleEnvOutput = this.handleEnvOutput.bind(this);
		// * TextInput
		this.handleEnvApiToken = this.handleEnvApiToken.bind(this);
		this.handleEnvSpaceId = this.handleEnvSpaceId.bind(this);
	}
	updatePhase(phase) {
		this.setState({ phase });
	}
	handleIntro({ value: phase } = selection) {
		//? Param syntax look weird? See here: https://codeburst.io/renaming-destructured-variables-in-es6-807549754972
		this.setState({ phase });
	}
	// setNestedState(parentObject, childKey, childValue) {
	// 	let obj = this.state[parentObject];
	// 	let key = [parentObject];
	// 	log(`key: ${key}`);
	// 	log(`obj: ${JSON.stringify(obj, null, 2)}`);
	// 	log(`childKey: ${JSON.stringify(childKey, null, 2)}`);
	// 	log(`childValue: ${JSON.stringify(childValue, null, 2)}`);
	// 	log(`parentObject: ${JSON.stringify(parentObject, null, 2)}`);
	// 	this.setState(({ obj }) => ({
	// 		[key]: {
	// 			...obj,
	// 			[childKey]: childValue
	// 		}
	// 	}));
	// }
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
	handleEnvOutput(outputLoc) {
		// this.setState(({ env }) => ({
		// 	env: {
		// 		...env,
		// 		outputLoc
		// 	}
		// }));
		this.setNestedStateEnv({ outputLoc });
	}
	handleEnvApiToken(apiToken) {
		// this.setState(({ env }) => ({
		// 	env: {
		// 		...env,
		// 		apiToken
		// 	}
		// }));
		this.setNestedStateEnv({ apiToken });
	}
	handleEnvSpaceId(spaceId) {
		// this.setState(({ env }) => ({
		// 	env: {
		// 		...env,
		// 		spaceId
		// 	}
		// }));
		this.setNestedStateEnv({ spaceId });
	}
	componentDidCatch(error, errorInfo) {
		this.setState({ error, errorInfo });
	}
	//TODO: Break env and config into functions
	render() {
		let component;
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
			component = (
				<Box>
					<SelectInput items={wydItems} onSelect={this.handleIntro} />
				</Box>
			);
		} else if (this.state.phase == "envSpaceId") {
			component = (
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
			component = (
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
			component = (
				<Box>
					<Text>{`Where would you like to output this data?\n`}</Text>
					<SelectInput
						items={envOutputItems}
						onHighlight={this.handleEnvOutput}
						onSelect={() => this.updatePhase("envDone")}
					/>
				</Box>
			);
		} else if (this.state.phase == "envDone") {
			//TODO: Output to .env
			let data = `SPACE_ID='${this.state.env.spaceId}'\nAPI_TOKEN='${
				this.state.env.apiToken
			}'`;
			switch (this.state.env.outputLoc) {
				case "dotEnv":
					fs.outputFile(".env", data, err => {
						if (err) {
							throw err;
						}
						log(`data written to .env \n --------------------\n${data}`);
					});
					break;
				case "clipboard":
					clipboardy.writeSync(data);
					break;
			}
			component = (
				<Box>
					<Text>Finished {JSON.stringify(this.state, null, 2)}</Text>
				</Box>
			);
		}
		//TODO: Add check to see if gitignore exists. If not, offer to create one
		return <Box>{component}</Box>;
	}
}

render(<SearchQuery />);
// else if (this.state.phase == "configKitQuantity") {
// 	component = (
// 		<Box>
// 			<Box>
// 				<Text>How many kits would you like to download assets from?</Text>
// 			</Box>
// 			<Box>
// 				<TextInput
// 					value={this.state.config.quantity}
// 					onChange={this.handleConfigKitQuantity}
// 					onSubmit={this.updatePhase("configKitName")}
// 					placeholder="name"
// 				/>
// 			</Box>
// 		</Box>
// 	);
// }
