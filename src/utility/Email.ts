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

export const emailHasNothingAfterAtCharacter = (email : string): boolean =>
{
	return email.split(atCharacter)[1] === "";
}

export const doesEmailHavePeriod = (email : string): boolean =>
{
	return email.split(atCharacter)[1].includes(".");
}

export const doesEmailHaveExtension = (email : string): boolean =>
{
	const charactersAfterAtCharacter: string = email.split(atCharacter)[1];	
	const charactersSplitByPeriod: string[] = charactersAfterAtCharacter.split(".");
	const hasCharactersAfterPeriod: boolean = charactersSplitByPeriod[1] !== "";
	return hasCharactersAfterPeriod;
}

export const doesEmailHaveAtCharacter = (email : string) : boolean =>
{
	const emailSplitByAtCharacter : string[] = email.split(atCharacter);
	return emailSplitByAtCharacter.length >= 2;
}

export const doesEmailHaveInvalidCharacters = (email: string): boolean =>
{
	const validEmailCharactersRegex:  RegExp = 
	new RegExp(/^[a-zA-Z0-9~`!@\#\$%\^&\*\_\-\+={\}\|\\"'\.\?\/]*$/);

	return !validEmailCharactersRegex.test(email);
}