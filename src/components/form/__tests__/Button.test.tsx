import React from "react";
import { render } from "@testing-library/react";
import Button from "../Button";

test("Renders Button component correctly.", () => {
	const { container } = render
	(
		<Button 
			text="Text"
			onClick={() => alert("clicked") }
			style={{
				color: "red"
			}}
			disabled={true}
			disabledTooltipTitle="disabled"
			className="class"
		/>
	);
	expect(container).toMatchSnapshot();
});