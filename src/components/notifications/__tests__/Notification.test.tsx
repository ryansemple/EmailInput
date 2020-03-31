import React from "react";
import { render } from "@testing-library/react";
import Notification from "../Notification";

test("Renders Notification component correctly.", () => {
	const { container } = render(
		<Notification 
			text="Notification"
			className="class"
		/>
	);
	expect(container).toMatchSnapshot();
});