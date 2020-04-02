import React, { useState, useEffect } from "react";
import EmailSuggestion from "./EmailSuggestion";
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
	const [currentEmailSuggestions, setCurrentEmailSuggestions] = 
		useState([""]);
	const [showEmailSuggestions, setShowEmailSuggestions] = 
		useState(false);
	const [defaultEmailSuggestions] = useState(new EmailSuggestions());

	useEffect(() => 
	{
		setCurrentEmailSuggestions
		(
			defaultEmailSuggestions.returnValidEmailSuggestions(email)
		);

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
		setShowEmailSuggestions,
		defaultEmailSuggestions
	]);

	const emailSuggestionOnClick = (suggestedEmail: string): void => 
	{
		setEmail(suggestedEmail);
		setEmailIsValid(true);
		setEmailMessage(emailAppearsToBeValid);
	}
	
	return (
		<>
			{showEmailSuggestions && 
			<ul className="EmailSuggestions full_width">
				{currentEmailSuggestions.map((emailSuggestion: string) => 
					<EmailSuggestion
						key={emailSuggestion}
						emailSuggestion={emailSuggestion}
						onClick={emailSuggestionOnClick}
					/>
				)}
			</ul>
			}
		</>
	)
}

export default EmailSuggestionsComponent;