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

export const isDomainInEmail = (email : string) : boolean =>
{
	const emailSplitOnAtCharacter : string[] = email.split(atCharacter);
	return emailSplitOnAtCharacter.length >= 2;
}