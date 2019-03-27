import React from "react";
import { render, Box, Text } from "ink";
import TextInput from "ink-text-input";
import SelectInput from "ink-select-input";

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
			query: "",
			error: "",
			errorInfo: "",
			wydValue: ""
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleWydSelect = this.handleWydSelect.bind(this);
	}

	componentDidCatch(error, errorInfo) {
		this.setState({ error, errorInfo });
	}
	render() {
		const wydItems = [
			{
				label: "Add environment variables",
				value: "env"
			},
			{
				label: "Generate config boilerplate",
				value: "config"
			}
		];
		return (
			<Box>
				<Box marginRight={1}>What would you like to do?</Box>
				<SelectInput items={wydItems} onSelect={this.handleWydSelect} />
				{/* <TextInput
					value={this.state.query}
					onChange={this.handleChange}
					placeholder="name"
				/> */}
			</Box>
		);
	}

	handleChange(query) {
		this.setState({ query });
		console.log(`Updated query: ${this.state.query}`);
	}
	handleWydSelect({ value: wydValue } = selection) {
		//Above syntax look weird? See here: https://codeburst.io/renaming-destructured-variables-in-es6-807549754972
		this.setState({ wydValue });
		console.log(`wyd selected: ${JSON.stringify(wydValue, null, 2)}`);
	}
}

render(<SearchQuery />);
