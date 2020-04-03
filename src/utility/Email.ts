import { atCharacter } from "./String";

export const emailDomains : string[] =
[
	"yahoo",
	"gmail",
	"hotmail",
	"live",
	"outlook"
];

export const domainExtensions: string[] =
[
	"com",
	"ca",
	"co.uk"
]

/**
 * Returns whether an email has nothing after its at character.
 * 
 * @param email - the email that will be checked.
 */
export const emailHasNothingAfterAtCharacter = (email : string): boolean =>
{
	console.log(`AAAA ${email.split(atCharacter)[1]}`);
	return email.split(atCharacter)[1] === "";
}

/**
 * Returns whether an email has a period.
 * 
 * @param email - the email that will be checked.
 */
export const doesEmailHavePeriod = (email : string): boolean =>
{
	return email.split(atCharacter)[1].includes(".");
}

/**
 * Returns whether an email has an extension.
 * 
 * @param email - the email that will be checked.
 */
export const doesEmailHaveExtension = (email : string): boolean =>
{
	const charactersAfterAtCharacter: string = email.split(atCharacter)[1];	
	const charactersSplitByPeriod: string[] = charactersAfterAtCharacter.split(".");
	const hasCharactersAfterPeriod: boolean = charactersSplitByPeriod[1] !== "";
	return hasCharactersAfterPeriod;
}

/**
 * Returns whether an email has an at character.
 * 
 * @param email - the email that will be checked.
 */
export const doesEmailHaveAtCharacter = (email : string) : boolean =>
{
	const emailSplitByAtCharacter : string[] = email.split(atCharacter);
	return emailSplitByAtCharacter.length >= 2;
}

/**
 * Returns whether an email has invalid characters.
 * 
 * @param email - the email that will be checked.
 */
export const doesEmailHaveInvalidCharacters = (email: string): boolean =>
{
	const validEmailCharactersRegex:  RegExp = 
		new RegExp(/^[a-zA-Z0-9~`!@#$%^&*_\-+={}|"'.?/]*$/);

	return !validEmailCharactersRegex.test(email);
}