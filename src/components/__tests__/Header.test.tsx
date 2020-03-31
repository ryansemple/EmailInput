import React from "react";
import { render } from "@testing-library/react";
import Header from "../Header";

test("Renders Header component correctly.", () => {
	const { container } = render
	(
		<Header title="Header Title" />
	);

	expect(container).toMatchSnapshot();
});