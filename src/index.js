// require("dotenv").config();
// console.log(`Hello ${process.env.SAMPLE_ENV}! from node-starter`);

import React from "react";
import { render, Box, Color } from "ink";

const Demo = () => (
	<Box>
		<Color rgb={[255, 255, 255]} bgKeyword="magenta">
			Hello!
		</Color>
		<Color hex="#000000" bgHex="#FFFFFF">
			Hey there
		</Color>
		<Color blue>I'm blue</Color>{" "}
	</Box>
);
render(<Demo />);
