import React from "react";
import { render } from "@testing-library/react";
import Suggestion from "../Suggestion";

test("Renders Suggestion component correctly.", () => {
	const { container } = render
	(
		<Suggestion
			emailSuggestion="suggestion"
			emailSuggestionClickEvent={() => {}}
		/>
	);
	
	expect(container).toMatchSnapshot();
});