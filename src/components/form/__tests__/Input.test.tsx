import React from "react";
import { render } from "@testing-library/react";
import Input from "../Input";

test("Renders Button component correctly.", () => {
	const { container } = render
	(
		<Input
			className="class"
			value="abc"
			onChange={(value: string) => { alert("changed") }}
			name="input"
		/>
	);
	expect(container).toMatchSnapshot();
});