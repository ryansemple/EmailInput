import { 
	emailHasNothingAfterAtCharacter,
	doesEmailHavePeriod,
	doesEmailHaveExtension,
	doesEmailHaveAtCharacter,
	doesEmailHaveInvalidCharacters
} from "../Email";

test('emailHasNothingAfterAtCharacter should return true when the email has no characters after the at character.', () => {
	const email = "abc3@";

	const actualValue: boolean = emailHasNothingAfterAtCharacter(email);

	expect(actualValue).toBe(true);
});

test('emailHasNothingAfterAtCharacter should return false when the email has characters after the at character.', () => {
	const email = "abc3@gmail.com";

	const actualValue: boolean = emailHasNothingAfterAtCharacter(email);

	expect(actualValue).toBe(false);
});

test('doesEmailHavePeriod should return true when the email has a period.', () => {
	const email = "xyb2@yahoo.";

	const actualValue: boolean = doesEmailHavePeriod(email);

	expect(actualValue).toBe(true);
});

test('doesEmailHavePeriod should return false when the email does not have a period.', () => {
	const email = "xyb2@yah";

	const actualValue: boolean = doesEmailHavePeriod(email);

	expect(actualValue).toBe(false);
});

test('doesEmailHaveExtension should return true when the email has an extension.', () => {
	const email = "xyb2@yahoo.ca";

	const actualValue: boolean = doesEmailHaveExtension(email);

	expect(actualValue).toBe(true);
});

test('doesEmailHaveExtension should return false when the email does not have an extension.', () => {
	const email = "ure@gmail.";

	const actualValue: boolean = doesEmailHaveExtension(email);

	expect(actualValue).toBe(false);
});

test('doesEmailHaveAtCharacter should return true when the email has an at character.', () => {
	const email = "uhhheg3@";

	const actualValue: boolean = doesEmailHaveAtCharacter(email);

	expect(actualValue).toBe(true);
});

test('doesEmailHaveAtCharacter should return false when the email does not have an at character.', () => {
	const email = "billy123";

	const actualValue: boolean = doesEmailHaveAtCharacter(email);

	expect(actualValue).toBe(false);
});

test('doesEmailHaveInvalidCharacters should return true when the email has invalid characters.', () => {
	const email = "ace👍";

	const actualValue: boolean = doesEmailHaveInvalidCharacters(email);

	expect(actualValue).toBe(true);
});

test('doesEmailHaveInvalidCharacters should return false when the email does not have invalid characters.', () => {
	const email = "great55+spam@gmail.com";

	const actualValue: boolean = doesEmailHaveInvalidCharacters(email);

	expect(actualValue).toBe(false);
});