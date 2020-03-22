import React, { useState, useEffect } from "react";
import Suggestion from "./Suggestion";
import { isAlphaNumericRegex } from "../repository/Regex";
import clsx from "clsx";

interface ISuggestionsProps {
	// showSuggestions: boolean,
	// emailSuggestions: string[],
	// emailSuggestionClickEvent: any
	setEmail: (email: string) => void,
	email: string
}

const popularEmailDomains : string[] =
[
	"yahoo",
	"gmail",
	"hotmail",
	"live",
	"outlook",
	"aol"
];

const atCharacter : string = "@";

const EmailSuggestions = (props: ISuggestionsProps) => 
{
	const [emailSuggestions, setEmailSuggestions] = useState([""]);
	const [showEmailSuggestions, setShowEmailSuggestions] = useState(false);

	const emailSuggestionsClickEvent = (email: string): void => 
	{
		props.setEmail(email);
	}

	const isAlphaNumeric = (input: string): boolean => isAlphaNumericRegex.test(input);

	const checkForDomainToMatchEmail = 
	(
		emailCharactersAfterAtCharacter: string, 
		popularEmailDomain: string,
		emailCharactersBeforeAtCharacter: string
	): string => 
	{
		let suggestedEmail: string = "";
		const popularEmailDomainCharacters: string[] = popularEmailDomain.split("");
		let popularEmailMatch: boolean = true;
		
		for (let i2 = 0; i2 < emailCharactersAfterAtCharacter.length; i2++)
		{
			if 
			(
				popularEmailDomainCharacters[i2] &&
				popularEmailDomainCharacters[i2] !== emailCharactersAfterAtCharacter[i2]
			)
			{
				popularEmailMatch = false;
				break;
			}
		}

		if(popularEmailMatch)
		{
			suggestedEmail = `${emailCharactersBeforeAtCharacter}@${popularEmailDomain}.com`;
		}

		return suggestedEmail;
	}

	const setSuggestionsAfterEmailChanges = (email: string): void =>
	{
		let newEmailSuggestions: string[] = [];

		for (let i = 0; i < popularEmailDomains.length; i++) 
		{
			let suggestedEmail: string = "";
			const popularEmailDomain: string = popularEmailDomains[i];

			if (!email.includes(atCharacter))
			{
					suggestedEmail = `${email}@${popularEmailDomain}.com`;
			}

			if(email.includes(atCharacter))
			{
				const emailSplitByAtCharacter: string[] = email.split(atCharacter);
				const emailCharactersAfterAtCharacter: string = emailSplitByAtCharacter[1];
				const emailCharactersBeforeAtCharacter: string = emailSplitByAtCharacter[0];

				if 
				(
					emailCharactersAfterAtCharacter &&
					!isAlphaNumeric(emailCharactersAfterAtCharacter)
				)
				{
						continue;
				}
				
				if (emailCharactersAfterAtCharacter.length === 0)
				{
					suggestedEmail = `${email}${popularEmailDomain}.com`;
				} 
				else 
				{
					suggestedEmail = checkForDomainToMatchEmail
					(
						emailCharactersAfterAtCharacter,
						popularEmailDomain,
						emailCharactersBeforeAtCharacter
					);

					if(suggestedEmail === "")
					{
						continue;
					}
				}    
			}
				
			if(suggestedEmail && suggestedEmail !== "")
			{
				newEmailSuggestions.push(suggestedEmail);
			}     
		}

		setEmailSuggestions(newEmailSuggestions);
	}

	useEffect(() => {
		setSuggestionsAfterEmailChanges(props.email);
	}, [props.email]);
	
	return (
		<div
			className={clsx(
				showEmailSuggestions && "show", 
				"Email_Suggestions", 
				"float_left")}>
			<ul>
				{
				emailSuggestions.map
				((emailSuggestion: string, index: number) => 
					<Suggestion
						key={emailSuggestion}
						emailSuggestion={emailSuggestion}
						emailSuggestionClickEvent={emailSuggestionsClickEvent}
					/>
				)
				}
			</ul>
		</div>
	)
}

export default EmailSuggestions;