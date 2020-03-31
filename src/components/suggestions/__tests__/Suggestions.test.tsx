import React from "react";
import { render } from "@testing-library/react";
import Suggestions from "../Suggestions";

test("Renders Suggestions component correctly.", () => {
	const { container } = render
	(
		<Suggestions
			email="ryan@gmail.com"
			setEmail={() => {}}
		/>
	);
	
	expect(container).toMatchSnapshot();
});