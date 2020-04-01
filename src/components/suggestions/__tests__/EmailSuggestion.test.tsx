import React from "react";
import { render } from "@testing-library/react";
import EmailSuggestion from "../EmailSuggestion";

test("Renders EmailSuggestion component correctly.", () => {
	const { container } = render
	(
		<EmailSuggestion
			emailSuggestion="suggestion"
			onClick={() => {}}
		/>
	);
	
	expect(container).toMatchSnapshot();
});