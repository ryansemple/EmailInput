import React from "react";
import { render } from "@testing-library/react";
import ValidationMessage from "../ValidationMessage";
import { ValidationType } from "../../types/ValidationType";

test("Renders ValidationMessage component correctly.", () => {
	const { container } = render(
		<ValidationMessage 
			validationMessage="This is valid"
			validationType={ValidationType.Success}
		/>
	);

	expect(container).toMatchSnapshot();
});