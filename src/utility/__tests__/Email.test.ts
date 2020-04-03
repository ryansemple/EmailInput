import { 
	emailHasNothingAfterAtCharacter,
	emailHasPeriod,
	emailHasExtension,
	emailHasAtCharacter,
	emailHasInvalidCharacters,
	firstCharacterOfEmailIsValid,
	emailDomainStartsWithAPeriod,
	emailUsernameHasTwoSuccessivePeriods
} from "../Email";

test('emailHasNothingAfterAtCharacter should return true when the email has no characters after the at character.', () => {
	const email: string = "abc3@";

	const actualValue: boolean = emailHasNothingAfterAtCharacter(email);

	expect(actualValue).toBe(true);
});

test('emailHasNothingAfterAtCharacter should return false when the email has characters after the at character.', () => {
	const email: string = "abc3@gmail.com";

	const actualValue: boolean = emailHasNothingAfterAtCharacter(email);

	expect(actualValue).toBe(false);
});

test('emailHasPeriod should return true when the email has a period.', () => {
	const email: string = "xyb2@yahoo.";

	const actualValue: boolean = emailHasPeriod(email);

	expect(actualValue).toBe(true);
});

test('emailHasPeriod should return false when the email does not have a period.', () => {
	const email: string = "xyb2@yah";

	const actualValue: boolean = emailHasPeriod(email);

	expect(actualValue).toBe(false);
});

test('emailHasExtension should return true when the email has an extension.', () => {
	const email: string = "xyb2@yahoo.ca";

	const actualValue: boolean = emailHasExtension(email);

	expect(actualValue).toBe(true);
});

test('emailHasExtension should return false when the email does not have an extension.', () => {
	const email: string = "ure@gmail.";

	const actualValue: boolean = emailHasExtension(email);

	expect(actualValue).toBe(false);
});

test('emailHasAtCharacter should return true when the email has an at character.', () => {
	const email: string = "uhhheg3@";

	const actualValue: boolean = emailHasAtCharacter(email);

	expect(actualValue).toBe(true);
});

test('emailHasAtCharacter should return false when the email does not have an at character.', () => {
	const email: string = "billy123";

	const actualValue: boolean = emailHasAtCharacter(email);

	expect(actualValue).toBe(false);
});

test('emailHasInvalidCharacters should return true when the email has invalid characters.', () => {
	const email: string = "ace👍";

	const actualValue: boolean = emailHasInvalidCharacters(email);

	expect(actualValue).toBe(true);
});

test('emailHasInvalidCharacters should return false when the email does not have invalid characters.', () => {
	const email: string = "great55+spam@gmail.com";

	const actualValue: boolean = emailHasInvalidCharacters(email);

	expect(actualValue).toBe(false);
});

test('firstCharacterOfEmailIsValid should return true when the first character of an email is alphanumeric.', () => {
	const email: string = "greg@yahoo.ca";

	const actualValue: boolean = firstCharacterOfEmailIsValid(email);

	expect(actualValue).toBe(true);
});

test('firstCharacterOfEmailIsValid should return false when the first character of an email is not alphanumeric.', () => {
	const email: string = "%gregyuuy+2@gmail.com";

	const actualValue: boolean = firstCharacterOfEmailIsValid(email);

	expect(actualValue).toBe(false);
});

test('emailDomainStartsWithAPeriod should return true when the domain of an email begins with a period.', () => {
	const email: string = "canada@.gmail.ca";

	const actualValue: boolean = emailDomainStartsWithAPeriod(email);

	expect(actualValue).toBe(true);
});

test('emailDomainStartsWithAPeriod should return false when the domain of an email does not begins with a period.', () => {
	const email: string = "hhhh54@gmail.c";

	const actualValue: boolean = emailDomainStartsWithAPeriod(email);

	expect(actualValue).toBe(false);
});

test('emailUsernameHasTwoSuccessivePeriods should return true when the email username has two successive periods.', () => {
	const email: string = "july..a@yahoo.co.uk";

	const actualValue: boolean = emailUsernameHasTwoSuccessivePeriods(email);

	expect(actualValue).toBe(true);
});

test('emailUsernameHasTwoSuccessivePeriods should return false when the email username has does not have two successive periods.', () => {
	const email: string = "august.hey@yahoo.com";

	const actualValue: boolean = emailUsernameHasTwoSuccessivePeriods(email);

	expect(actualValue).toBe(false);
});