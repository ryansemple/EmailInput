import React from "react";
import { render } from "@testing-library/react";
import Notifications from "../Notifications";
import Notification from "../../../types/Notification";
import ValidationType from "../../../types/ValidationType";

test("Renders Notifications component correctly.", () => {

	const notifications: Notification[] = [
		new Notification("success", ValidationType.Success),
		new Notification("error", ValidationType.Error)
	]

	const { container } = render(
		<Notifications
			notifications={notifications}
			setNotifications={() => {}}
		/>
	);
	expect(container).toMatchSnapshot();
});