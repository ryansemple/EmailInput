import React from "react";
import { render } from "@testing-library/react";
import EmailSuggestions from "../EmailSuggestions";

test("Renders EmailSuggestions component correctly.", () => {
	const { container } = render
	(
		<EmailSuggestions
			email="ryan@gmail.com"
			setEmail={() => {}}
			setEmailIsValid={() => {}}
			setEmailValidationMessage={() => {}}
		/>
	);
	
	expect(container).toMatchSnapshot();
});