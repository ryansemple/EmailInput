import EmailSuggestion from "./EmailSuggestion";
import { 
	emailDomains, 
	domainExtensions, 
	returnIfEmailIsValid 
} from "../utility/Email";
import { atCharacter } from "../utility/String";

interface EmailSuggestionsInterface {
	emailSuggestions: EmailSuggestion[],
	returnValidEmailSuggestions: (userEnteredEmail: string) => string[]
}

/**
 * Class that has is used to keep a collection of notications
 * and provides some functions for returning subsets of the
 * notifications collection.
 * 
 * @class EmailSuggestions
 * @implements {EmailSuggestionsInterface}
 */
class EmailSuggestions implements EmailSuggestionsInterface {
	public readonly emailSuggestions: EmailSuggestion[];
	
	/**
	 * Sets the emailSuggestions property to be all possible 
	 * combinations of the email domains and extensions.
	 */
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

	/**
	 * Returns all valid email suggestions based on the email the user entered.
	 * 
	 * @param {string} userEnteredEmail - the email that the user has entered.
	 */
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

	/**
	 * Returns all unfiltered email suggestions based on the email 
	 * the user entered.
	 *
	 * @param {string} userEnteredEmail - the email that the user has entered.
	 */
	private returnAllEmailSuggestions = (userEnteredEmail: string): string[] =>
	{
		let validEmailSuggestions: string[] = [];
		
		for (let i: number = 0; i < this.emailSuggestions.length; i++)
		{
			const currentEmailSuggestion: EmailSuggestion = this.emailSuggestions[i];
			const emailSuggestion = currentEmailSuggestion
				.returnFullEmail(userEnteredEmail);

			if (returnIfEmailIsValid(emailSuggestion))
			{
				validEmailSuggestions.push(emailSuggestion);
			}
		}

		return validEmailSuggestions;
	}

	/**
	 * Returns all email suggestions filtered by the characters the user
	 * entered afer the at character.
	 *
	 * @param {string} userEnteredEmail - the email that the user has entered.
	 * @param {string} userEnteredEmailAfterAtCharacter - the characters after 
	 * the at character in the user entered email.
	 */
	private returnFitleredEmailSuggestions = (
		userEnteredEmail: string, 
		userEnteredEmailAfterAtCharacter: string
	) : string[] => 
	{
		let validEmailSuggestions: string[] = [];

		for (let i: number = 0; i < this.emailSuggestions.length; i++)
		{
			const currentEmailSuggestion: EmailSuggestion = this.emailSuggestions[i];
			const currentEmailSuggestionAfterAtCharacter: string =
				currentEmailSuggestion.returnEmailAfterAtCharacter();
			const regexToMatch: RegExp = new RegExp(`^${userEnteredEmailAfterAtCharacter}`);

			const userEmailMatchesSuggestedEmailExactly = 
				userEnteredEmailAfterAtCharacter ===
				currentEmailSuggestionAfterAtCharacter;
			
			if (userEmailMatchesSuggestedEmailExactly) 
			{
				continue;
			}

			if (currentEmailSuggestionAfterAtCharacter.match(regexToMatch))
			{
				const emailSuggestion = currentEmailSuggestion.returnFullEmail(
					userEnteredEmail
				);

				if (returnIfEmailIsValid(emailSuggestion))
				{
					validEmailSuggestions.push(emailSuggestion);
				}
			}
		}

		return validEmailSuggestions;
	}
}

export default EmailSuggestions;