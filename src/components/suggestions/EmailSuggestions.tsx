import React, { useState, useEffect } from "react";
import EmailSuggestion from "./EmailSuggestion";
import { emailAppearsToBeValid } from "../../utility/Language";
import EmailSuggestions from "../../types/EmailSuggestions";
import { doesEmailHaveInvalidCharacters } from "../../utility/Email";

interface EmailSuggestionsProps {
	email: string,
	setEmail: (email: string) => void,
	setEmailIsValid: (emailIsValid: boolean) => void,
	setEmailValidationMessage: (emailValidationMessage: string) => void
}

/**
 * Renders valid email suggestions based on the user's inputted email.
 */
const EmailSuggestionsComponent = (props: EmailSuggestionsProps) => 
{	
	const { 
		email, 
		setEmail, 
		setEmailIsValid, 
		setEmailValidationMessage 
	} = props;

	const [currentEmailSuggestions, setCurrentEmailSuggestions] = 
		useState([""]);
	const [defaultEmailSuggestions] = useState(new EmailSuggestions());
	
	useEffect(() => 
	{
		const emailContainsInvalidCharacters: boolean =
		doesEmailHaveInvalidCharacters(email);
		
		if(emailContainsInvalidCharacters || !email)
		{
			setCurrentEmailSuggestions([""]);
		} 
		else 
		{
			setCurrentEmailSuggestions
			(
				defaultEmailSuggestions.returnValidEmailSuggestions(email)
			);
		}
	}, 
	[
		email,
		defaultEmailSuggestions
	]);

	/**
	 * when the suggestion is clicked, the email in the form input
	 * will be changed to the suggestion and the user will be able
	 * to submit the email for verification.
	 * @param suggestedEmail - the clicked suggested email.
	 */
	const emailSuggestionOnClick = (suggestedEmail: string): void => 
	{
		setEmail(suggestedEmail);
		setEmailIsValid(true);
		setEmailValidationMessage(emailAppearsToBeValid);
	}
	
	const showEmailSuggestions: boolean = currentEmailSuggestions[0] !== "";

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