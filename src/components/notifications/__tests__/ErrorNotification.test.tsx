import React from "react";
import { render } from "@testing-library/react";
import ErrorNotification from "../ErrorNotification";

test("Renders ErrorNotification component correctly.", () => {
	const { container } = render(
		<ErrorNotification 
			text="Error"
		/>
	);
	expect(container).toMatchSnapshot();
});