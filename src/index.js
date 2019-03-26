import React from "react";
import { render, Box, Text } from "ink";
import TextInput from "ink-text-input";

class SearchQuery extends React.Component {
	constructor() {
		super();

		this.state = {
			query: "",
			error: "",
			errorInfo: ""
		};

		this.handleChange = this.handleChange.bind(this);
	}

	componentDidCatch(error, errorInfo) {
		this.setState({ error, errorInfo });
	}
	render() {
		return (
			<Box>
				<Box marginRight={1}>Enter your query:</Box>

				<TextInput value={this.state.query} onChange={this.handleChange} />
			</Box>
		);
	}

	handleChange(query) {
		this.setState({ query });
		console.log(`Updated query: ${this.state.query}`);
	}
}

render(<SearchQuery />);

// const Demo = () => (
// 	<Box>
// 		<Box>
// 			<Text bold>I am bold</Text>
// 			<Text italic>I am italic</Text>
// 			<Text underline>I am underline</Text>
// 			<Text strikethrough>I am strikethrough</Text>
// 		</Box>
// 	</Box>
// );

// render(<Demo />);
