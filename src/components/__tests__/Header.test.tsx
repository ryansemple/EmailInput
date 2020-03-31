import React from "react";
import { render } from "@testing-library/react";
import Header from "../Header";

test("renders Header component correctly.", () => {
	const headerTitle: string = "Header Title";
	const { container } = render(<Header title={headerTitle} />);
	expect(container).toMatchSnapshot();
});