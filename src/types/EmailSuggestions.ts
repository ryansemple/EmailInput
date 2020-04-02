import EmailSuggestion from "./EmailSuggestion";
import { emailDomains, domainExtensions } from "../utility/Email";
import { atCharacter } from "../utility/String";

interface EmailSuggestionsInterface {
	emailSuggestions: EmailSuggestion[],
	returnValidEmailSuggestions: (userEnteredEmail: string) => string[]
}

class EmailSuggestions implements EmailSuggestionsInterface {
	public readonly emailSuggestions: EmailSuggestion[];
	
	constructor()
	{ 
		let emailSuggestions: EmailSuggestion[] = [];
		
		for (let i: number = 0; i < emailDomains.length; i++)
		{
			const emailDomain: string = emailDomains[i];

			for (let i2: number = 0; i2 < domainExtensions.length; i2++)
			{
				const domainExtension: string = domainExtensions[i2];
				
				emailSuggestions.push
				(
					new EmailSuggestion(emailDomain, domainExtension)
				);
			}
		}

		this.emailSuggestions = emailSuggestions;
	}

	public returnValidEmailSuggestions = (userEnteredEmail: string): string[] =>
	{
		if (!userEnteredEmail.includes(atCharacter)) 
		{
			return this.returnAllEmailSuggestions(userEnteredEmail);
		}
		else 
		{
			const emailSplitByAtCharacter: string[] = 
				userEnteredEmail.split(atCharacter);
			const emailCharactersAfterAtCharacter: string = 
				emailSplitByAtCharacter[1];

			if (emailCharactersAfterAtCharacter === "") 
			{
				return this.returnAllEmailSuggestions(userEnteredEmail);
			}
			else
			{
				return this.returnFitleredEmailSuggestions(
					userEnteredEmail, 
					emailCharactersAfterAtCharacter
				);
			}
		}
	}

	private returnAllEmailSuggestions = (userEnteredEmail: string): string[] =>
	{
		let validEmailSuggestions: string[] = [];
		
		for (let i: number = 0; i < this.emailSuggestions.length; i++)
		{
			const currentEmailSuggestion: EmailSuggestion = this.emailSuggestions[i];
			const validEmailSuggestion = currentEmailSuggestion.returnFullEmail(
				userEnteredEmail
			);
			validEmailSuggestions.push(validEmailSuggestion);
		}

		return validEmailSuggestions;
	}

	private returnFitleredEmailSuggestions =
	(userEnteredEmail: string, userEnteredEmailAfterAtCharacter: string) : string[] => 
	{
		let validEmailSuggestions: string[] = [];

		for (let i: number = 0; i < this.emailSuggestions.length; i++)
		{
			const currentEmailSuggestion: EmailSuggestion = this.emailSuggestions[i];
			const currentEmailSuggestionAfterAtCharacter: string =
				currentEmailSuggestion.returnEmailAfterAtCharacter();
			const regexToMatch: RegExp = new RegExp
			(
				`^${userEnteredEmailAfterAtCharacter}`
			);

			const userEmailMatchesSuggestedEmailExactly = 
				userEnteredEmailAfterAtCharacter ===
				currentEmailSuggestionAfterAtCharacter;
			
			if(userEmailMatchesSuggestedEmailExactly) 
			{
				continue;
			}

			if (currentEmailSuggestionAfterAtCharacter.match(regexToMatch))
			{
				const validEmailSuggestion = currentEmailSuggestion.returnFullEmail(
					userEnteredEmail
				);

				validEmailSuggestions.push(validEmailSuggestion);
			}
		}

		return validEmailSuggestions;
	}
}

export default EmailSuggestions;