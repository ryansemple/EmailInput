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

class EmailSuggestion implements EmailSuggestionInterface {
	public readonly id: string;
	public readonly domain: string;
	public readonly extension: string;

	constructor(domain: string, extension: string)
	{ 
		this.id = returnNewUuid();
		this.domain = domain;
		this.extension = extension;
	}

	public returnFullEmail = (enteredEmail: string): string => 
	{
		let emailUsername = enteredEmail.split(atCharacter)[0];
		return `${emailUsername}@${this.returnEmailAfterAtCharacter()}`;
	}

	public returnEmailAfterAtCharacter = (): string =>
	{
		return `${this.domain}.${this.extension}`;
	}
}

export default EmailSuggestion;