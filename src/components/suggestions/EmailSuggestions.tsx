import React, { useState, useEffect } from "react";
import EmailSuggestionComponent from "./EmailSuggestion";
import { emailAppearsToBeValid } from "../../utility/Language";
import EmailSuggestions from "../../types/EmailSuggestions";

interface EmailSuggestionsProps {
	email: string,
	setEmail: (email: string) => void,
	setEmailIsValid: (emailIsValid: boolean) => void,
	setEmailMessage: (emailMessage: string) => void
}

const EmailSuggestionsComponent = (props: EmailSuggestionsProps) => 
{	
	const { email, setEmail, setEmailIsValid, setEmailMessage } = props;
	const [currentEmailSuggestions, setCurrentEmailSuggestions] = useState([""]);
	const [showEmailSuggestions, setShowEmailSuggestions] = useState(false);
	const emailSuggestions: EmailSuggestions = new EmailSuggestions();

	const emailSuggestionsClickEvent = (suggestedEmail: string): void => 
	{
		setEmail(suggestedEmail);
		setEmailIsValid(true);
		setEmailMessage(emailAppearsToBeValid);
	}

	useEffect(() => 
	{
		setCurrentEmailSuggestions(emailSuggestions.returnValidEmailSuggestions(email));

		if (email)
		{
			setShowEmailSuggestions(true);
		} 
		else 
		{
			setShowEmailSuggestions(false);
		}
	}, 
	[
		email,
		setShowEmailSuggestions
	]);
	
	return (
		<div className="EmailSuggestions full_width">
			{showEmailSuggestions &&
			<ul>
				{currentEmailSuggestions.map((emailSuggestion: string) => 
					<EmailSuggestionComponent
						key={emailSuggestion}
						emailSuggestion={emailSuggestion}
						onClick={emailSuggestionsClickEvent}
					/>
				)}
			</ul>
			}
		</div>
	)
}

export default EmailSuggestionsComponent;