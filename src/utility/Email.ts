import { atCharacter } from "./String";
import Validator from "../types/Validator";

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
	return email.split(atCharacter)[1] === "";
}

/**
 * Returns whether an email has a period.
 * 
 * @param email - the email that will be checked.
 */
export const emailHasPeriod = (email : string): boolean =>
{
	return email.split(atCharacter)[1].includes(".");
}

/**
 * Returns whether an email has an extension.
 * 
 * @param email - the email that will be checked.
 */
export const emailHasExtension = (email : string): boolean =>
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
export const emailHasAtCharacter = (email : string) : boolean =>
{
	const emailSplitByAtCharacter: string[] = email.split(atCharacter);
	return emailSplitByAtCharacter.length >= 2;
}

/**
 * Returns whether an email has invalid characters.
 * 
 * @param email - the email that will be checked.
 */
export const emailHasInvalidCharacters = (email: string): boolean =>
{
	const validEmailCharactersRegex: RegExp = 
		new RegExp(/^[a-zA-Z0-9~`!@#$%^&*_\-+={}|"'.?/]*$/);

	return !validEmailCharactersRegex.test(email);
}

/**
 * Returns whether the first character of an email is valid.
 * A valid first character must be alphanumeric.
 * 
 * @param email - the email that will be checked.
 */
export const firstCharacterOfEmailIsValid = (email: string): boolean => 
{
	const alphaNumericRegex: RegExp = new RegExp(/^[a-z0-9]+$/i);
	const firstCharacterOfEmail: string = email[0];
	return alphaNumericRegex.test(firstCharacterOfEmail);
}

/**
 * Returns whether the email's domain begins with a period.
 * 
 * @param email - the email that will be checked.
 */
export const emailDomainStartsWithAPeriod = (email: string): boolean =>
{
	const domain: string = email.split(atCharacter)[1];
	return domain[0] === ".";
}

/**
 * The collection of validators that will each be ran when email 
 * is validated. if the predicateMeansFailIfTrue function fails 
 * then that error will be shown to the user and no further validators 
 * will be ran. The order of this collection matters, the validators 
 * will be ran from top to bottom.
 */
export const emailValidators: Validator[] =
[
	{ 
		predicateMeansFailIfTrue: emailHasInvalidCharacters,
		errorMessageIfFailed: "Email is not valid, it contains invalid characters."
	},
	{
		predicateMeansFailIfTrue: (email: string) => !firstCharacterOfEmailIsValid(email),
		errorMessageIfFailed: `First character of email is not valid, it should be alphanumeric`
	},
	{
		predicateMeansFailIfTrue: (email: string) => !email.includes(atCharacter),
		errorMessageIfFailed: `Email doesn't contain an '${atCharacter}' character`
	},
	{
		predicateMeansFailIfTrue: (email: string) => email.split(atCharacter).length === 3,
		errorMessageIfFailed: `Email can only contain one '${atCharacter}' character`
	},
	{
		predicateMeansFailIfTrue: emailHasNothingAfterAtCharacter,
		errorMessageIfFailed: `Email doesn't contain a domain name (name after the '${atCharacter}' character)`
	},
	{
		predicateMeansFailIfTrue: emailDomainStartsWithAPeriod,
		errorMessageIfFailed: `Email domain can not begin with a period`
	},
	{
		predicateMeansFailIfTrue: (email: string) => !emailHasPeriod(email),
		errorMessageIfFailed: `Email doesn't have a period`
	},
	{
		predicateMeansFailIfTrue: (email: string) => !emailHasExtension(email),
		errorMessageIfFailed: `Email doesn't have an extension (eg: com, ca)`
	}
];

/**
 * Runs all the email validators and returns false if any of the
 * predicateMeansFailIfTrue functions pass. Returns true if all of
 * them fail.
 * 
 * @param email - the email that will be checked.
 */
export const returnIfEmailIsValid = (email: string): boolean =>
{
	for (let i: number = 0; i < emailValidators.length; i++)
	{
		const validator: Validator = emailValidators[i];

		const validationFailed: boolean = validator.predicateMeansFailIfTrue(email);

		if(validationFailed)
		{
			return false;
		}
	}

	return true;
}