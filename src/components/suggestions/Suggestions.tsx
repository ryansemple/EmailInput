import React, { useState, useEffect } from "react";
import Suggestion from "./Suggestion";
import { isAlphaNumericRegex } from "../../utility/Regex";
import clsx from "clsx";
import { atCharacter } from "../../utility/String";
import { popularEmailDomains } from "../../utility/Email";

interface ISuggestionsProps {
	setEmail: (email: string) => void,
	email: string
}

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
		
		for (let i: number = 0; i < emailCharactersAfterAtCharacter.length; i++)
		{
			const currentEmailCharacterAfterAtCharacter: string = emailCharactersAfterAtCharacter[i];
			const currentPopularEmailDomainCharacter: string = popularEmailDomainCharacters[i];
			
			if 
			(
				currentPopularEmailDomainCharacter &&
				currentPopularEmailDomainCharacter !== currentEmailCharacterAfterAtCharacter
			)
			{
				popularEmailMatch = false;
				break;
			}
		}

		if (popularEmailMatch)
		{
			suggestedEmail = `${emailCharactersBeforeAtCharacter}@${popularEmailDomain}.com`;
		}

		return suggestedEmail;
	}

	const setSuggestionsAfterEmailChanges = (email: string): void =>
	{
		let newEmailSuggestions: string[] = [];

		for (let i: number = 0; i < popularEmailDomains.length; i++) 
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

		if(props.email)
		{
			setShowEmailSuggestions(true);
		} 
		else 
		{
			setShowEmailSuggestions(false);
		}
	}, [props.email]);
	
	return (
		<div className="Email_Suggestions">
			{showEmailSuggestions &&
			<ul>
				{emailSuggestions.map((emailSuggestion: string) => 
					<Suggestion
						key={emailSuggestion}
						emailSuggestion={emailSuggestion}
						emailSuggestionClickEvent={emailSuggestionsClickEvent}
					/>
				)}
			</ul>
			}
		</div>
	)
}

export default EmailSuggestions;