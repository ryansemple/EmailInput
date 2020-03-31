import React from "react";
import { render } from "@testing-library/react";
import SuccessNotification from "../SuccessNotification";

test("Renders SuccessNotification component correctly.", () => {
	const { container } = render(
		<SuccessNotification 
			text="Success"
		/>
	);
	expect(container).toMatchSnapshot();
});