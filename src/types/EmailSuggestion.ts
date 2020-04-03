import ObjectWithId from "./ObjectWithId";
import { returnNewUuid } from "../utility/Uuid";
import { atCharacter } from "../utility/String";

interface EmailSuggestionInterface extends ObjectWithId {
	id: string,
	domain: string,
	extension: string,
	returnFullEmail: (emailUsername: string) => string,
	returnEmailAfterAtCharacter: () => string
}

/**
 * Class that restricts the way an EmailSuggestion can be created
 * by encapsulating the logic for creating a new id so that it will
 * always be a new uuid and making the properties readonly so that
 * they can not be modified after the class has been constructed.
 *
 * @class EmailSuggestion
 * @implements {EmailSuggestionInterface}
 */
class EmailSuggestion implements EmailSuggestionInterface {

	/**
	 * The id that will be used to uniquely identity the EmailSuggestion.
	 */
	public readonly id: string;

	/**
	 * the domain part of the email. 
	 * 
	 * For example: "gmail", "yahoo".
	 */
	public readonly domain: string;

	/**
	 * The extension part of the email.
	 * 
	 * For example: "com", "ca";
	 */
	public readonly extension: string;

	constructor(domain: string, extension: string)
	{ 
		this.id = returnNewUuid();
		this.domain = domain;
		this.extension = extension;
	}

	/**
	 * Returns the full email of based on the email passed in. 
	 *
	 * For example, if "jason@g" is passed in and the emails domain 
	 * is "gmail" and the extension is "ca" then it
	 * would output "jason@gmail.ca".
	*/
	public returnFullEmail = (enteredEmail: string): string => 
	{
		let emailUsername = enteredEmail.split(atCharacter)[0];
		return `${emailUsername}@${this.returnEmailAfterAtCharacter()}`;
	}

	/**
	 * Returns the domain and the extension as a string with a 
	 * period in between them.
	 *
	 * For example, if the domain is "gmail" and the extension is 
	 * "ca" then it would output "gmail.ca".
	*/
	public returnEmailAfterAtCharacter = (): string =>
	{
		return `${this.domain}.${this.extension}`;
	}
}

export default EmailSuggestion;