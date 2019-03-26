import React from "react";
import { render, Box, Text } from "ink";
import TextInput from "ink-text-input";
import SelectInput from "ink-select-input";

import init from "lingo-asset-fetcher-lib";
import config from "./index.config";

init("Test Me", config.testMe.targetOne, "./downloads/testMeOne", "PNG");

// class SearchQuery extends React.Component {
// 	constructor() {
// 		super();

// 		this.state = {
// 			query: "",
// 			error: "",
// 			errorInfo: ""
// 		};

// 		this.handleChange = this.handleChange.bind(this);
// 	}

// 	componentDidCatch(error, errorInfo) {
// 		this.setState({ error, errorInfo });
// 	}
// 	/*
// 	? How do I add a placeholder value for the TextInput component

// 	*/
// 	render() {
// 		return (
// 			<Box>
// 				<Box marginRight={1}>Enter your query:</Box>
// 				<TextInput
// 					value={this.state.query}
// 					onChange={this.handleChange}
// 					placeholder="name"
// 				/>
// 			</Box>
// 		);
// 	}

// 	handleChange(query) {
// 		this.setState({ query });
// 		console.log(`Updated query: ${this.state.query}`);
// 	}
// }

// render(<SearchQuery />);
