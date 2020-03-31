import React from "react";
import { render } from "@testing-library/react";
import Label from "../Label";

test("Renders Label component correctly.", () => {
	const { container } = render
	(
		<Label
			className="class"
			text="Label text"
			htmlFor="input"
		/>
	);
	expect(container).toMatchSnapshot();
});