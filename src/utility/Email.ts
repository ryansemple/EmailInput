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

export const doesEmailHaveDomain = (email : string): boolean =>
{
	return email.split(atCharacter)[1].includes(".");
}

export const doesEmailHaveAtCharacter = (email : string) : boolean =>
{
	const emailSplitByAtCharacter : string[] = email.split(atCharacter);
	return emailSplitByAtCharacter.length >= 2;
}