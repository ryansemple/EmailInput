import React from "react";
import { render } from "@testing-library/react";
import ValidationMessage from "../ValidationMessage";
import { ValidationType } from "../../types/ValidationType";

test("Renders ValidationMessage component correctly.", () => {
	const validationMessage: string = "This is valid";
	const validationType: ValidationType = ValidationType.Success;

	const { container } = render(
		<ValidationMessage 
			validationMessage={validationMessage}
			validationType={validationType}
		/>
	);

	expect(container).toMatchSnapshot();
});