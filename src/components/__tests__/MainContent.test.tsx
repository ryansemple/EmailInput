import React from "react";
import { render } from "@testing-library/react";
import MainContent from "../MainContent";

test("Renders MainContent component correctly.", () => {
	const { container } = render(<MainContent />);
	expect(container).toMatchSnapshot();
});