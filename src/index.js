import React from "react";
import { render, Box, Text } from "ink";
import TextInput from "ink-text-input";
import SelectInput from "ink-select-input";
const log = console.log;

import * as laf from "lingo-asset-fetcher-lib";
import config from "./index.config";

laf.init("Test Me", config.testMe.targetOne, "./downloads/testMeOne", "PNG");

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
			textInput: "",
			selectInput: ""
		};

		this.handleIntro = this.handleIntro.bind(this); // What are you doing?
		this.handleEnvChange = this.handleEnvChange.bind(this);
		// this.handleEnvSubmit = this.handleEnvSubmit.bind(this);
	}

	componentDidCatch(error, errorInfo) {
		this.setState({ error, errorInfo });
	}
	render() {
		let component;
		const wydItems = [
			{
				label: "Add environment variables",
				value: "env_space_id"
			},
			{
				label: "Generate config boilerplate",
				value: "config"
			}
		];
		if (this.state.phase == "") {
			component = <SelectInput items={wydItems} onSelect={this.handleIntro} />;
		} else if (this.state.phase == "env_space_id") {
			component = (
				<Box>
					<Text>What's your spaceId?</Text>
					<TextInput
						value={this.state.textInput}
						onChange={this.handleEnvChange}
						onSubmit={() => this.handleEnvSubmit("env_api_token")}
						placeholder="000000"
					/>
				</Box>
			);
		} else if (this.state.phase == "env_api_token") {
			component = <Text>made it</Text>;
		} else if (this.state.phase == "config") {
			component = (
				<Box>
					<TextInput
						value={this.state.textInput}
						onChange={this.handleEnvChange}
						onSubmit={() => this.handleEnvSubmit("config_two")}
						placeholder="name"
					/>
				</Box>
			);
		}
		return <Box>{component}</Box>;
	}

	handleEnvChange(textInput) {
		// console.log(`textInput: ${textInput}`);
		this.setState({ textInput });
	}
	handleEnvSubmit(phase) {
		log(`\nphase: ${phase}`);
		this.setState({ phase });
	}
	handleIntro({ value: phase } = selection) {
		//Above syntax look weird? See here: https://codeburst.io/renaming-destructured-variables-in-es6-807549754972
		log(`\nphase: ${phase}`);
		this.setState({ phase });
	}
}

render(<SearchQuery />);
